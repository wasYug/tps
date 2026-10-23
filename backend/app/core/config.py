from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str

    EMBEDDING_API_KEY: str
    EMBEDDING_MODEL: str
    EMBEDDING_BASE_URL: str
    # EMBEDDING_DIMENSION: str | None = None
    EMBEDDING_DIMENSION: int | None = None
    
    LLM_API_KEY: str
    LLM_BASE_URL: str
    LLM_MODEL: str

    KNOWLEDGE_BUCKET: str
    KNOWLEDGE_FILE: str

    RAG_MIN_SIMILARITY: float
    RAG_TOP_K: int

    ENV: str = "development"

    class Config:
        env_file = ".env"


settings = Settings()


SUPABASE_URL = settings.SUPABASE_URL
SUPABASE_ANON_KEY = settings.SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY = settings.SUPABASE_SERVICE_ROLE_KEY

EMBEDDING_API_KEY = settings.EMBEDDING_API_KEY
EMBEDDING_MODEL = settings.EMBEDDING_MODEL
EMBEDDING_BASE_URL = settings.EMBEDDING_BASE_URL
EMBEDDING_DIMENSION = settings.EMBEDDING_DIMENSION

LLM_API_KEY = settings.LLM_API_KEY
LLM_BASE_URL = settings.LLM_BASE_URL
LLM_MODEL = settings.LLM_MODEL

KNOWLEDGE_BUCKET = settings.KNOWLEDGE_BUCKET
KNOWLEDGE_FILE = settings.KNOWLEDGE_FILE

RAG_MIN_SIMILARITY = settings.RAG_MIN_SIMILARITY
RAG_TOP_K = settings.RAG_TOP_K