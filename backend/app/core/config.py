from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str

    ENV: str = "development"

    class Config:
        env_file = ".env"


settings = Settings()


SUPABASE_URL = settings.SUPABASE_URL
SUPABASE_ANON_KEY = settings.SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY = settings.SUPABASE_SERVICE_ROLE_KEY