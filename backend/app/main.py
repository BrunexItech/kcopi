import os
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from .database import Base, engine
from .limiter import limiter
from .routers import public, admin, auth_router, fx

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Kcopi Global API", version="1.0.0")

# Individual routes opt in with @limiter.limit(...) — keeps the public
# enquiry form and admin login from being spammed/brute-forced.
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

origins = os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(BASE_DIR, "static")
os.makedirs(os.path.join(STATIC_DIR, "uploads"), exist_ok=True)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
app.mount("/uploads", StaticFiles(directory=os.path.join(STATIC_DIR, "uploads")), name="uploads")

app.include_router(public.router)
app.include_router(auth_router.router)
app.include_router(admin.router)
app.include_router(fx.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
