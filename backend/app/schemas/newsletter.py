from pydantic import BaseModel, EmailStr, Field


class NewsletterRequest(BaseModel):
    email: EmailStr


class NewsletterResponse(BaseModel):
    success: bool
    message: str