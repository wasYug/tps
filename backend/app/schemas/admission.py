from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal
from datetime import date


class AdmissionRequest(BaseModel):
    # Student Details
    student_name: str = Field(..., min_length=2, max_length=100)
    date_of_birth: date

    # Academic Details
    admission_for_std: Literal[
    "Nursery",
    "LKG",
    "UKG",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
]
    previous_school: Optional[str] = Field(default=None, max_length=200)

    # Parent Details
    father_name: str = Field(..., min_length=2, max_length=100)
    mother_name: str = Field(..., min_length=2, max_length=100)

    # Contact Details
    email: EmailStr
    phone: str = Field(..., pattern=r"^[6-9]\d{9}$")


    number_of_siblings: int = Field(default=0, ge=0, le=10)

    date_of_visit: Optional[date] = None

    address: str = Field(..., min_length=10, max_length=500)

    # Additional Information
    message: Optional[str] = Field(default=None, max_length=1000)


class AdmissionResponse(BaseModel):
    success: bool
    message: str