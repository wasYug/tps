from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.public import contact, admission, alumni, newsletter
from app.routers.admin import noticeboard, events

app = FastAPI(
    title="School Website API",
    version="1.0.0",
    description="Backend API for the School Website"
)

# Allow React frontend
origins = [
    "http://localhost:5173",
    "https://tps-ten.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router)
app.include_router(admission.router)
app.include_router(alumni.router)
app.include_router(newsletter.router)
app.include_router(noticeboard.router)
app.include_router(events.router)

@app.get("/")
async def root():
    return {
        "status": "running",
        "message": "School Website Backend"
    }

@app.head("/api/health")
async def health():
    return {
        "status": "healthy",
        "message": "School Website Backend is Healthy"
    }


# uvicorn app.main:app --reload
