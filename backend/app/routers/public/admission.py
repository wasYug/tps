from fastapi import APIRouter
from app.schemas.admission import AdmissionRequest
from app.services.admission_service import create_admission

router = APIRouter(
    prefix="/api/admission",
    tags=["Admission"]
)


@router.post("/")
async def submit_admission(data: AdmissionRequest):

    result = await create_admission(data)

    return {
        "success": True,
        "data": result
    }