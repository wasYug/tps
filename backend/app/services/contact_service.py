from app.core.database import supabase


async def create_contact(data):
    response = (
        supabase
        .table("contact_messages")
        .insert({
            "name": data.name,
            "email": data.email,
            "phone": data.phone,
            "class_interested": data.class_interested,
            "message": data.message,
        })
        .execute()
    )

    return response.data