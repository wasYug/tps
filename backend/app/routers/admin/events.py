from typing import Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.core.database import supabase
from app.core.permissions import require_admin


router = APIRouter(
    prefix="/api/admin/events",
    tags=["Events"],
    dependencies=[Depends(require_admin)]
)


def format_date_for_db(date_str: Optional[str]) -> str:
    if not date_str:
        return datetime.now().strftime("%Y-%m-%d")
    try:
        return datetime.strptime(date_str, "%Y-%m-%d").strftime("%Y-%m-%d")
    except ValueError:
        pass
    for fmt in ["%b %d, %Y", "%B %d, %Y", "%d %b %Y", "%d %B %Y", "%m/%d/%Y", "%d/%m/%Y"]:
        try:
            return datetime.strptime(date_str, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return datetime.now().strftime("%Y-%m-%d")


class EventRequest(BaseModel):
    heading_1: Optional[str] = None
    title: Optional[str] = None
    venue: str
    color: Optional[str] = "#2F79B8"
    date: Optional[str] = None


@router.post("")
@router.post("/")
async def create_event_item(
    data: EventRequest
):
    try:
        heading_1 = data.heading_1 or data.title or "Event"

        insert_data = {
            "heading_1": heading_1,
            "venue": data.venue,
            "date": format_date_for_db(data.date),
        }

        response = supabase.table("events").insert(insert_data).execute()
        return {
            "success": True,
            "data": response.data[0] if response.data else insert_data
        }
    except Exception as e:
        print("Error creating event item:", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.delete("/{id}")
async def delete_event_item(
    id: str,
):
    try:
        response = supabase.table("events").delete().eq("id", id).execute()
        return {
            "success": True,
            "message": "Deleted successfully"
        }
    except Exception as e:
        print("Error deleting event item:", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )