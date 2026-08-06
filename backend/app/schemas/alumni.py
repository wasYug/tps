from pydantic import BaseModel, EmailStr, Field


class AlumniRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., pattern=r"^[6-9]\d{9}$")
    workshop_topic: str = Field(..., min_length=10, max_length=500)
    experience: str = Field(..., min_length=10, max_length=500)


class AlumniResponse(BaseModel):
    success: bool
    message: str