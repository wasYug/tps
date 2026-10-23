from app.schemas.chatbot import ChatRequest, ChatResponse
from app.services.rag.graph import run_rag


def get_chatbot_response(request: ChatRequest) -> ChatResponse:

    result = run_rag(request.question.strip())

    return ChatResponse(
        answer=result["answer"],
        sources=result["sources"],
    )