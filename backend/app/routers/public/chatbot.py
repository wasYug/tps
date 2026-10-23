from fastapi import APIRouter, HTTPException

from app.schemas.chatbot import ChatRequest, ChatResponse
from app.services.chatbot_service import get_chatbot_response

router = APIRouter(
    prefix="/chatbot",
    tags=["Chatbot"],
)


@router.post("/", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    try:
        return get_chatbot_response(request)

    except Exception:
        # Replace with your existing logging convention
        # when we integrate the real RAG service.
        raise HTTPException(
            status_code=503,
            detail="The school assistant is temporarily unavailable.",
        )