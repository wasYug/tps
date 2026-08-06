from app.core.database import supabase


async def create_newsletter(data):
    response = (
        supabase
        .table("newsletter_subscribers")
        .insert({
            "email": data.email
        })
        .execute()
    )

    return response.data