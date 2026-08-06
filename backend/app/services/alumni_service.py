from app.core.database import supabase
from app.schemas.alumni import AlumniRequest
from fastapi import HTTPException, status


async def create_alumni(data: AlumniRequest):
    try : 
        response = (
            supabase
        .table("alumni_requests")
        .insert({
            "name": data.name,
            "email": data.email,
            "phone": data.phone,
            "workshop_topic": data.workshop_topic,
            "experience": data.experience,
        })
        .execute()
    )

        return response.data
    except Exception : 
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to submit alumni request. Please try again later."
        )