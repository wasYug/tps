from typing import Any

import jwt
from jwt import PyJWKClient

from fastapi import HTTPException, Security, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.config import SUPABASE_URL
from app.core.database import supabase


security = HTTPBearer()

jwks_client = PyJWKClient(
    f"{SUPABASE_URL}/auth/v1/.well-known/jwks.json"
)


def verify_token(token: str) -> dict[str, Any]:
    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token)

        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["ES256"],
            issuer=f"{SUPABASE_URL}/auth/v1",
            options={
                "verify_aud": False,
            },
        )
        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
        )

    except Exception as e:
        print("=" * 50)
        print(type(e))
        print(e)
        print("=" * 50)

        raise HTTPException(
            status_code=401,
            detail=str(e),
        )


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(security),
):
    token = credentials.credentials

    payload = verify_token(token)

    user_id = payload["sub"]

    response = (
        supabase.table("profiles")
        .select("*")
        .eq("id", user_id)
        .maybe_single()
        .execute()
    )

    if response.data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found",
        )

    profile = response.data

    if not profile["is_active"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account disabled",
        )

    if profile is None:
        raise HTTPException(
            status_code=401,
            detail="Profile not found."
    )

    return profile