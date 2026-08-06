from app.core.database import supabase
from app.schemas.admission import AdmissionRequest
from fastapi import HTTPException, status


async def create_admission(data: AdmissionRequest):
    try : 
        print(data)
        response = (
            supabase
            .table("admission_requests")
            .insert({
                "student_name": data.student_name,
                "date_of_birth": data.date_of_birth.isoformat(),
                "admission_for_std": data.admission_for_std,
                "previous_school": data.previous_school,
                "father_name": data.father_name,
                "mother_name": data.mother_name,
                "email": data.email,
                "phone": data.phone,
                "address": data.address,
                "number_of_siblings": data.number_of_siblings,
                "date_of_visit": (
                    data.date_of_visit.isoformat()
                    if data.date_of_visit
                    else None
                ),
                "message": data.message,
            })
            .execute()
        )

        return response.data
    except Exception : 
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to submit admission request. Please try again later."
        )