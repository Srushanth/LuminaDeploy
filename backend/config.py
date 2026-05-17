from pydantic_settings import BaseSettings
from pydantic_settings import SettingsConfigDict


class Settings(BaseSettings):
    gcp_project_id: str = "gen-lang-client-0570044087"
    gcp_region: str = "asia-south1"

    # Optional: Image for Cloud Run deployment
    ollama_image: str = "ollama/ollama:latest"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
