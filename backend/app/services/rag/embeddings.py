from functools import lru_cache
from openai import OpenAI
from app.core.config import (
    EMBEDDING_API_KEY,
    EMBEDDING_BASE_URL,
    EMBEDDING_MODEL,
    EMBEDDING_DIMENSION,
)

@lru_cache(maxsize=1)
def get_openai_client() -> OpenAI:
    """Initialize and cache the OpenAI-compatible client."""
    if not EMBEDDING_API_KEY:
        raise RuntimeError("EMBEDDING_API_KEY is not configured")

    return OpenAI(
        api_key=EMBEDDING_API_KEY,
        base_url=EMBEDDING_BASE_URL,  # Allows pointing to custom endpoints (Ollama, vLLM, etc.)
    )

def embed_text(text: str) -> list[float]:
    """Generate a single text embedding using an OpenAI-compatible API."""
    
    client = get_openai_client()
    
    # Build request arguments
    request_kwargs = {
        "model": EMBEDDING_MODEL,
        "input": text,
    }
    
    # Add dimensions if configured (supported by models like text-embedding-3-*)
    if EMBEDDING_DIMENSION:
        request_kwargs["dimensions"] = EMBEDDING_DIMENSION

    response = client.embeddings.create(**request_kwargs)

    if not response.data:
        raise RuntimeError("API returned no embedding")

    # OpenAI SDK returns the vector directly as a list of floats
    vector = response.data[0].embedding

    if vector is None or (EMBEDDING_DIMENSION and len(vector) != EMBEDDING_DIMENSION):
        raise RuntimeError("Unexpected embedding dimensions")

    return vector

    