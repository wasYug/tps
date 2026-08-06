from pydantic import BaseModel, EmailStr, Field, field_validator


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    class_interested: str = Field(..., min_length=1, max_length=10)
    message: str = Field(..., min_length=10, max_length=350)

    @field_validator("class_interested")
    @classmethod
    def validate_class_interested(cls, value: str) -> str:
        allowed = {"nursery", "kg"}
        
        # Normalize: lowercase + strip whitespace
        cleaned = value.strip().lower()
        
        if cleaned in allowed:
            return cleaned
        
        # Check if it's a number from 1 to 12
        try:
            num = int(cleaned)
            if 1 <= num <= 12:
                return str(num)
        except ValueError:
            pass
        
        raise ValueError(
            "class_interested must be 'nursery', 'kg' or a number from 1 to 12"
        )