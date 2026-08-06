from fastapi import APIRouter, Depends

from app.core.auth import get_current_user
from app.schemas.alumni import AlumniRequest
from app.services.alumni_service import create_alumni

from fastapi import Depends

from app.core.permissions import require_admin


router = APIRouter(
    prefix="/api/alumni",
    tags=["Alumni"]
)


@router.post("/")
async def submit_alumni(
    data: AlumniRequest,
    current_user=Depends(require_admin)
):

    result = await create_alumni(data,current_user)

    return {
        "success": True,
        "data": result
    }