from fastapi import Depends, HTTPException, status

from app.core.auth import get_current_user


async def require_admin(
    current_user=Depends(get_current_user),
):
    if not current_user["is_active"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is disabled.",
        )

    if not current_user["is_admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to access the admin panel.",
        )

    return current_user