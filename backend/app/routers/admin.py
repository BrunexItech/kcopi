import os
import shutil
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Destination, Tour, GalleryImage, Enquiry, AdminUser, BlogPost, MediaAsset, NewsletterSubscriber
from .. import schemas
from ..auth import get_current_admin

router = APIRouter(prefix="/api/admin", tags=["admin"], dependencies=[Depends(get_current_admin)])

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
UPLOAD_DIR = os.path.join(BASE_DIR, "static", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXT = {".jpg", ".jpeg", ".png", ".webp"}


def _save_upload(file: UploadFile) -> str:
    ext = os.path.splitext(file.filename or "")[1].lower()
    if ext not in ALLOWED_EXT:
        raise HTTPException(status_code=400, detail="Unsupported image type")
    name = f"{uuid.uuid4().hex}{ext}"
    dest_path = os.path.join(UPLOAD_DIR, name)
    with open(dest_path, "wb") as out:
        shutil.copyfileobj(file.file, out)
    return f"/uploads/{name}"


# ---------- Destinations ----------
@router.get("/destinations", response_model=list[schemas.DestinationOut])
def admin_list_destinations(db: Session = Depends(get_db)):
    return db.query(Destination).order_by(Destination.id).all()


@router.post("/destinations", response_model=schemas.DestinationOut, status_code=201)
def admin_create_destination(payload: schemas.DestinationCreate, db: Session = Depends(get_db)):
    if db.query(Destination).filter(Destination.slug == payload.slug).first():
        raise HTTPException(status_code=400, detail="Slug already exists")
    dest = Destination(**payload.model_dump())
    db.add(dest)
    db.commit()
    db.refresh(dest)
    return dest


@router.patch("/destinations/{dest_id}", response_model=schemas.DestinationOut)
def admin_update_destination(dest_id: int, payload: schemas.DestinationUpdate, db: Session = Depends(get_db)):
    dest = db.query(Destination).get(dest_id)
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(dest, k, v)
    db.commit()
    db.refresh(dest)
    return dest


@router.delete("/destinations/{dest_id}", status_code=204)
def admin_delete_destination(dest_id: int, db: Session = Depends(get_db)):
    dest = db.query(Destination).get(dest_id)
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
    db.delete(dest)
    db.commit()


# ---------- Tours ----------
@router.get("/tours", response_model=list[schemas.TourOut])
def admin_list_tours(db: Session = Depends(get_db)):
    return db.query(Tour).order_by(Tour.id).all()


@router.post("/tours", response_model=schemas.TourOut, status_code=201)
def admin_create_tour(payload: schemas.TourCreate, db: Session = Depends(get_db)):
    if db.query(Tour).filter(Tour.slug == payload.slug).first():
        raise HTTPException(status_code=400, detail="Slug already exists")
    data = payload.model_dump()
    data["itinerary"] = [d for d in data["itinerary"]]
    tour = Tour(**data)
    db.add(tour)
    db.commit()
    db.refresh(tour)
    return tour


@router.patch("/tours/{tour_id}", response_model=schemas.TourOut)
def admin_update_tour(tour_id: int, payload: schemas.TourUpdate, db: Session = Depends(get_db)):
    tour = db.query(Tour).get(tour_id)
    if not tour:
        raise HTTPException(status_code=404, detail="Tour not found")
    data = payload.model_dump(exclude_unset=True)
    if "itinerary" in data and data["itinerary"] is not None:
        data["itinerary"] = [d for d in data["itinerary"]]
    for k, v in data.items():
        setattr(tour, k, v)
    db.commit()
    db.refresh(tour)
    return tour


@router.delete("/tours/{tour_id}", status_code=204)
def admin_delete_tour(tour_id: int, db: Session = Depends(get_db)):
    tour = db.query(Tour).get(tour_id)
    if not tour:
        raise HTTPException(status_code=404, detail="Tour not found")
    db.delete(tour)
    db.commit()


# ---------- Gallery ----------
@router.get("/gallery", response_model=list[schemas.GalleryImageOut])
def admin_list_gallery(db: Session = Depends(get_db)):
    return db.query(GalleryImage).order_by(GalleryImage.id).all()


@router.post("/gallery/upload", response_model=schemas.GalleryImageOut, status_code=201)
def admin_upload_gallery_image(
    alt: str = Form(""),
    category: str = Form("wildlife"),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    path = _save_upload(file)
    img = GalleryImage(image_path=path, alt=alt, category=category)
    db.add(img)
    db.commit()
    db.refresh(img)
    return img


@router.delete("/gallery/{image_id}", status_code=204)
def admin_delete_gallery_image(image_id: int, db: Session = Depends(get_db)):
    img = db.query(GalleryImage).get(image_id)
    if not img:
        raise HTTPException(status_code=404, detail="Image not found")
    if img.image_path.startswith("/uploads/"):
        fs_path = os.path.join(UPLOAD_DIR, os.path.basename(img.image_path))
        if os.path.exists(fs_path):
            os.remove(fs_path)
    db.delete(img)
    db.commit()


# ---------- Image upload for destinations/tours (reuse same upload dir) ----------
@router.post("/upload")
def admin_upload_image(file: UploadFile = File(...)):
    path = _save_upload(file)
    return {"path": path}


# ---------- Blog ----------
@router.get("/blog", response_model=list[schemas.BlogPostOut])
def admin_list_blog_posts(db: Session = Depends(get_db)):
    return db.query(BlogPost).order_by(BlogPost.created_at.desc()).all()


@router.post("/blog", response_model=schemas.BlogPostOut, status_code=201)
def admin_create_blog_post(payload: schemas.BlogPostCreate, db: Session = Depends(get_db)):
    if db.query(BlogPost).filter(BlogPost.slug == payload.slug).first():
        raise HTTPException(status_code=400, detail="Slug already exists")
    post = BlogPost(**payload.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.patch("/blog/{post_id}", response_model=schemas.BlogPostOut)
def admin_update_blog_post(post_id: int, payload: schemas.BlogPostUpdate, db: Session = Depends(get_db)):
    post = db.query(BlogPost).get(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(post, k, v)
    db.commit()
    db.refresh(post)
    return post


@router.delete("/blog/{post_id}", status_code=204)
def admin_delete_blog_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(BlogPost).get(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(post)
    db.commit()


# ---------- Media library (posters/banners/promotions) ----------
@router.get("/media", response_model=list[schemas.MediaAssetOut])
def admin_list_media(db: Session = Depends(get_db)):
    return db.query(MediaAsset).order_by(MediaAsset.created_at.desc()).all()


@router.post("/media/upload", response_model=schemas.MediaAssetOut, status_code=201)
def admin_upload_media(
    title: str = Form(""),
    category: str = Form("promotion"),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    path = _save_upload(file)
    asset = MediaAsset(image_path=path, title=title, category=category)
    db.add(asset)
    db.commit()
    db.refresh(asset)
    return asset


@router.patch("/media/{asset_id}", response_model=schemas.MediaAssetOut)
def admin_update_media(asset_id: int, active: int = Form(...), db: Session = Depends(get_db)):
    asset = db.query(MediaAsset).get(asset_id)
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    asset.active = active
    db.commit()
    db.refresh(asset)
    return asset


@router.delete("/media/{asset_id}", status_code=204)
def admin_delete_media(asset_id: int, db: Session = Depends(get_db)):
    asset = db.query(MediaAsset).get(asset_id)
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    if asset.image_path.startswith("/uploads/"):
        fs_path = os.path.join(UPLOAD_DIR, os.path.basename(asset.image_path))
        if os.path.exists(fs_path):
            os.remove(fs_path)
    db.delete(asset)
    db.commit()


# ---------- Newsletter subscribers ----------
@router.get("/newsletter", response_model=list[schemas.NewsletterSubscriberOut])
def admin_list_newsletter_subscribers(db: Session = Depends(get_db)):
    return db.query(NewsletterSubscriber).order_by(NewsletterSubscriber.created_at.desc()).all()


# ---------- Enquiries ----------
@router.get("/enquiries", response_model=list[schemas.EnquiryOut])
def admin_list_enquiries(db: Session = Depends(get_db)):
    return db.query(Enquiry).order_by(Enquiry.created_at.desc()).all()


@router.patch("/enquiries/{enquiry_id}", response_model=schemas.EnquiryOut)
def admin_update_enquiry(enquiry_id: int, payload: schemas.EnquiryUpdate, db: Session = Depends(get_db)):
    enquiry = db.query(Enquiry).get(enquiry_id)
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    enquiry.status = payload.status
    db.commit()
    db.refresh(enquiry)
    return enquiry
