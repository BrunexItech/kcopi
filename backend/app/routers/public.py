from typing import Optional
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Destination, Tour, GalleryImage, Enquiry, BlogPost, MediaAsset, NewsletterSubscriber
from .. import schemas
from ..limiter import limiter
from ..mailer import send_email

ADMIN_EMAIL = "kcopi.info@gmail.com"

router = APIRouter(prefix="/api", tags=["public"])


@router.get("/destinations", response_model=list[schemas.DestinationOut])
def list_destinations(db: Session = Depends(get_db)):
    return db.query(Destination).order_by(Destination.id).all()


@router.get("/destinations/{slug}", response_model=schemas.DestinationOut)
def get_destination(slug: str, db: Session = Depends(get_db)):
    dest = db.query(Destination).filter(Destination.slug == slug).first()
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
    return dest


@router.get("/tours", response_model=list[schemas.TourOut])
def list_tours(category: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(Tour)
    if category and category != "all":
        q = q.filter(Tour.category == category)
    return q.order_by(Tour.id).all()


@router.get("/tours/{slug}", response_model=schemas.TourOut)
def get_tour(slug: str, db: Session = Depends(get_db)):
    tour = db.query(Tour).filter(Tour.slug == slug).first()
    if not tour:
        raise HTTPException(status_code=404, detail="Tour not found")
    return tour


@router.get("/gallery", response_model=list[schemas.GalleryImageOut])
def list_gallery(db: Session = Depends(get_db)):
    return db.query(GalleryImage).order_by(GalleryImage.id).all()


@router.get("/blog", response_model=list[schemas.BlogPostOut])
def list_blog_posts(db: Session = Depends(get_db)):
    return db.query(BlogPost).filter(BlogPost.published == 1).order_by(BlogPost.created_at.desc()).all()


@router.get("/blog/{slug}", response_model=schemas.BlogPostOut)
def get_blog_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.slug == slug, BlogPost.published == 1).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.get("/promotions", response_model=list[schemas.MediaAssetOut])
def list_promotions(db: Session = Depends(get_db)):
    return db.query(MediaAsset).filter(MediaAsset.active == 1).order_by(MediaAsset.created_at.desc()).all()


@router.post("/newsletter", status_code=201)
@limiter.limit("5/minute")
def subscribe_newsletter(
    request: Request,
    payload: schemas.NewsletterSubscribeRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    existing = db.query(NewsletterSubscriber).filter(NewsletterSubscriber.email == payload.email).first()
    if existing:
        return {"status": "already_subscribed"}
    sub = NewsletterSubscriber(email=payload.email)
    db.add(sub)
    db.commit()
    # Backgrounded: a slow Gmail SMTP round-trip must never hold up the HTTP
    # response the visitor is waiting on. The subscriber is already saved.
    background_tasks.add_task(
        send_email,
        payload.email,
        "Welcome to Kcopi Global",
        "Thanks for subscribing! You'll hear from us about once a month with safari tips and seasonal offers.\n\n"
        "- The Kcopi Global Team",
    )
    return {"status": "subscribed"}


@router.post("/enquiries", response_model=schemas.EnquiryOut, status_code=201)
@limiter.limit("5/minute")
def create_enquiry(
    request: Request,
    payload: schemas.EnquiryCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    enquiry = Enquiry(**payload.model_dump())
    db.add(enquiry)
    db.commit()
    db.refresh(enquiry)
    background_tasks.add_task(
        send_email,
        ADMIN_EMAIL,
        f"New enquiry from {enquiry.name}",
        "A new enquiry was submitted on the website:\n\n"
        f"Name: {enquiry.name}\n"
        f"Email: {enquiry.email}\n"
        f"Phone: {enquiry.phone or '-'}\n"
        f"Destination: {enquiry.destination or '-'}\n"
        f"Dates: {enquiry.dates or '-'}\n"
        f"Guests: {enquiry.guests or '-'}\n"
        f"Message: {enquiry.message or '-'}\n",
    )
    return enquiry
