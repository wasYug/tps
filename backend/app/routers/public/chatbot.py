from fastapi import APIRouter, HTTPException

from app.schemas.chatbot import ChatRequest, ChatResponse
from app.services.chatbot_service import get_chatbot_response

import logging
from fastapi import HTTPException

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/chatbot",
    tags=["Chatbot"],
)


import asyncio

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    try:
        return await asyncio.to_thread(get_chatbot_response, request)

    except HTTPException:
        # Preserve HTTP errors raised intentionally by your code
        raise

    except Exception:
        # Print the complete exception and traceback
        logger.exception("Error while generating chatbot response")

        raise HTTPException(
            status_code=503,
            detail="The school assistant is temporarily unavailable.",
        )
