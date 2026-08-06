from fastapi import APIRouter
from app.schemas.newsletter import NewsletterRequest
from app.services.newsletter_service import create_newsletter

router = APIRouter(
    prefix="/api/newsletter",
    tags=["Newsletter"]
)


@router.post("/")
async def submit_newsletter(data: NewsletterRequest):

    result = await create_newsletter(data)

    return {
        "success": True,
        "data": result
    }