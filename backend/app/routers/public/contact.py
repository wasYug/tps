from fastapi import APIRouter
from app.schemas.contact import ContactRequest
from app.services.contact_service import create_contact

router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"]
)


@router.post("/")
async def submit_contact(data: ContactRequest):

    result = await create_contact(data)

    return {
        "success": True,
        "data": result
    }