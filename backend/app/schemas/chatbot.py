from pydantic import BaseModel, Field
from typing import Any


class ChatRequest(BaseModel):
    question: str = Field(
        min_length=2,
        max_length=1000,
        description="The user's school-related question",
    )


class ChatSource(BaseModel):
    title: str
    source: str


class ChatImage(BaseModel):
    url: str
    alt : str
    caption: str

class ChatResponse(BaseModel):
    answer: str
    images: list[ChatImage] | dict[str, Any] = Field(default_factory=list)
    sources: list[ChatSource] = Field(default_factory=list)
