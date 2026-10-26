
from functools import lru_cache
from typing import Any, TypedDict
import json
import re
from openai import OpenAI
from langgraph.graph import StateGraph, START, END

from app.core.config import (
    LLM_API_KEY,
    LLM_BASE_URL,
    LLM_MODEL,
    RAG_MIN_SIMILARITY,
    RAG_TOP_K,
)
from app.core.database import supabase
from app.services.rag.embeddings import embed_text

from app.core.constants import SYSTEM_PROMPT

class RAGState(TypedDict, total=False):
    question: str
    documents: list[dict]
    answer: str
    images: Any
    sources: list[dict]


@lru_cache(maxsize=1)
def get_llm() -> OpenAI:
    if not LLM_API_KEY:
        raise RuntimeError("LLM_API_KEY is not configured")

    return OpenAI(
        api_key=LLM_API_KEY,
        base_url=LLM_BASE_URL,
        timeout=30.0,
        max_retries=1,
    )


def retrieve_documents(state: RAGState) -> dict:
    """Embed the question and retrieve relevant active chunks."""

    query_vector = embed_text(state["question"])

    result = supabase.rpc(
        "match_knowledge_documents",
        {
            "query_embedding": query_vector,
            "match_count": RAG_TOP_K,
        },
    ).execute()

    documents = result.data or []

    # Filter weak matches before sending context to the LLM.
    relevant_documents = [
        document
        for document in documents
        if float(document["similarity"]) >= RAG_MIN_SIMILARITY
    ]

    return {"documents": relevant_documents}
    # this is the context for the chatbot


def generate_answer(state: RAGState) -> dict:
    """Generate an answer using retrieved school information."""

    documents = state.get("documents", [])

    if not documents:
        return {
            "answer": (
                """
                I couldn't find sufficiently relevant information 
                in the school's knowledge base to answer that. 
                Please contact the school office for confirmation.
                """
            ).strip(),
            "images": {},
            "sources": [],
        }

    context_parts = []
    sources = {}

    for document in documents:
        source = document["source"]
        chunk_index = document["chunk_index"]

        context_parts.append(
            f"[Source: {source}; chunk: {chunk_index}]\n"
            f"{document['content']}"
        )

        sources[source] = {
            "title": source.rsplit("/", 1)[-1],
            "source": source,
        }

    context = "\n\n---\n\n".join(context_parts)

    messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT,
        },
        {
            "role": "user",
            "content": (
                f"Retrieved school context:\n{context}\n\n"
                f"Visitor's question:\n{state['question']}"
            ),
        },
    ]

    primary_model = LLM_MODEL
    fallback_model = LLM_MODEL

    response = None
    try:
        response = get_llm().chat.completions.create(
            model=primary_model,
            messages=messages,
            max_tokens=2048,
            extra_body={"thinking": {"type": "disabled"}},
        )
    except Exception:
        try:
            response = get_llm().chat.completions.create(
                model=primary_model,
                messages=messages,
                max_tokens=2048,
            )
        except Exception:
            if primary_model != fallback_model:
                response = get_llm().chat.completions.create(
                    model=fallback_model,
                    messages=messages,
                    max_tokens=2048,
                )
            else:
                raise

    message = response.choices[0].message
    raw_response = (message.content or "").strip()
    
    # Reasoning models (e.g. Nemotron) may store chain-of-thought in reasoning_content
    reasoning = getattr(message, "reasoning_content", None) or ""
    if not raw_response and reasoning:
        # Check if JSON answer exists inside reasoning
        json_match = re.search(r'\{[\s\S]*"answer"[\s\S]*\}', reasoning)
        if json_match:
            raw_response = json_match.group(0).strip()
        else:
            raw_response = reasoning.strip()

    # Strip markdown code fences if LLM wrapped JSON in ```json ... ```
    cleaned_text = raw_response
    if cleaned_text.startswith("```"):
        lines = cleaned_text.splitlines()
        if lines and lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]
        cleaned_text = "\n".join(lines).strip()

    answer = ""
    images = {}

    try:
        result = json.loads(cleaned_text)
        answer = result.get("answer", "")
        images = result.get("images", {})
    except Exception:
        # If output was truncated or slightly malformed, safely recover "answer" via regex
        match = re.search(r'"answer"\s*:\s*"((?:\\.|[^"\\])*)', cleaned_text)
        if match:
            try:
                answer = json.loads(f'"{match.group(1)}"')
            except Exception:
                answer = match.group(1).encode().decode("unicode-escape", errors="ignore")
        else:
            # If not JSON, use the raw response text if available
            answer = raw_response
        images = {}

    # Graceful fallback instead of throwing an unhandled exception
    if not answer or not str(answer).strip():
        answer = (
            "I apologize, but I could not confirm that information with certainty right now. "
            "Please contact the school office at principal@tps.edu or info@tps.edu for clarification."
        )
        images = {}

    return {
        "answer": str(answer).strip(),
        "images": images,
        "sources": list(sources.values()),
    }


builder = StateGraph(RAGState)

builder.add_node("retrieve", retrieve_documents)
builder.add_node("generate", generate_answer)

builder.add_edge(START, "retrieve")
builder.add_edge("retrieve", "generate")
builder.add_edge("generate", END)

rag_graph = builder.compile()


def run_rag(question: str) -> dict:
    result = rag_graph.invoke({"question": question})
    # print(result)
    return {
        "answer": result.get("answer", ""),
        "images": result.get("images", {}),
        "sources": result.get("sources", []),
    }
