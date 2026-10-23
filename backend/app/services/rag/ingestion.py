from uuid import uuid4

from app.core.config import (
    KNOWLEDGE_BUCKET,
    KNOWLEDGE_FILE,
)
from app.core.database import supabase
from app.services.rag.embeddings import embed_text


CHUNK_SIZE = 1200
CHUNK_OVERLAP = 150
INSERT_BATCH_SIZE = 25


def split_markdown(text: str) -> list[str]:
    """Split Markdown into overlapping character-based chunks."""

    text = text.strip()

    if not text:
        raise ValueError("The Markdown file is empty")

    chunks = []
    start = 0

    while start < len(text):
        end = min(start + CHUNK_SIZE, len(text))
        chunk = text[start:end].strip()

        if chunk:
            chunks.append(chunk)

        if end == len(text):
            break

        start = end - CHUNK_OVERLAP

    return chunks


def ingest_knowledge() -> dict:
    """Download, embed, and activate a new knowledge version."""

    # Download the original Markdown from the private bucket.
    raw_file = (
        supabase.storage
        .from_(KNOWLEDGE_BUCKET)
        .download(KNOWLEDGE_FILE)
    )

    markdown = raw_file.decode("utf-8").strip()

    if not markdown:
        raise ValueError("The downloaded Markdown file is empty")

    chunks = split_markdown(markdown)
    version_id = str(uuid4())

    # Generate every embedding before activating the new version.
    # If Gemini fails, the existing active version stays untouched.
    rows = []

    for index, chunk in enumerate(chunks):
        vector = embed_text(chunk)

        rows.append({
            "version_id": version_id,
            "content": chunk,
            "source": KNOWLEDGE_FILE,
            "chunk_index": index,
            "embedding": vector,
        })

    # Insert the new version in batches.
    # It is not active yet, so retrieval continues using the old one.
    for offset in range(0, len(rows), INSERT_BATCH_SIZE):
        batch = rows[offset:offset + INSERT_BATCH_SIZE]

        (
            supabase.table("knowledge_documents")
            .insert(batch)
            .execute()
        )

    # Switch the active index only after every insert succeeds.
    supabase.rpc(
        "activate_knowledge_version",
        {"new_version": version_id},
    ).execute()

    return {
        "status": "success",
        "version_id": version_id,
        "chunks_indexed": len(chunks),
        "source": KNOWLEDGE_FILE,
    }