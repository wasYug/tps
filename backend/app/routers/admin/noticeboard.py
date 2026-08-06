from typing import Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.core.database import supabase
from app.core.permissions import require_admin


router = APIRouter(
    prefix="/api/admin/noticeboard",
    tags=["Noticeboard"]
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


class NoticeboardRequest(BaseModel):
    main_heading_1: Optional[str] = None
    main_heading_2: Optional[str] = None
    badge: Optional[str] = None
    title: Optional[str] = None
    content: str
    date: Optional[str] = None
    color: Optional[str] = "#2F79B8"


@router.post("")
@router.post("/")
async def create_noticeboard_item(
    data: NoticeboardRequest,
    current_user=Depends(require_admin)
):
    try:
        heading_1 = data.main_heading_1 or data.badge or "Notice"
        heading_2 = data.main_heading_2 or data.title or "Announcement"

        insert_data = {
            "main_heading_1": heading_1,
            "main_heading_2": heading_2,
            "content": data.content,
            "date": format_date_for_db(data.date),
        }

        response = supabase.table("noticeboard").insert(insert_data).execute()
        return {
            "success": True,
            "data": response.data[0] if response.data else insert_data
        }
    except Exception as e:
        print("Error creating noticeboard item:", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.delete("/{id}")
async def delete_noticeboard_item(
    id: str,
    current_user=Depends(require_admin)
):
    try:
        response = supabase.table("noticeboard").delete().eq("id", id).execute()
        return {
            "success": True,
            "message": "Deleted successfully"
        }
    except Exception as e:
        print("Error deleting noticeboard item:", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )