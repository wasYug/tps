from fastapi import HTTPException, status


def unauthorized():
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
    )


def forbidden():
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Forbidden",
    )