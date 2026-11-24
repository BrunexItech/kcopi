from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict


# ---------- Destination ----------
class DestinationBase(BaseModel):
    slug: str
    name: str
    country: str
    tagline: str = ""
    best_time: str = ""
    blurb: str = ""
    highlights: list[str] = []
    hero_image: str = ""
    split_image: str = ""
    cta_image: str = ""
    tour_count: int = 0


class DestinationCreate(DestinationBase):
    pass


class DestinationUpdate(BaseModel):
    slug: Optional[str] = None
    name: Optional[str] = None
    country: Optional[str] = None
    tagline: Optional[str] = None
    best_time: Optional[str] = None
    blurb: Optional[str] = None
    highlights: Optional[list[str]] = None
    hero_image: Optional[str] = None
    split_image: Optional[str] = None
    cta_image: Optional[str] = None
    tour_count: Optional[int] = None


class DestinationOut(DestinationBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ---------- Tour ----------
class ItineraryDay(BaseModel):
    label: str
    title: str
    desc: str


class TourBase(BaseModel):
    slug: str
    title: str
    category: str = "wildlife"
    destination_name: str = ""
    hero_image: str = ""
    days: int = 1
    nights: int = 0
    price_usd: float = 0
    group_size: str = ""
    style: str = ""
    summary: str = ""
    itinerary: list[ItineraryDay] = []


class TourCreate(TourBase):
    pass


class TourUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    category: Optional[str] = None
    destination_name: Optional[str] = None
    hero_image: Optional[str] = None
    days: Optional[int] = None
    nights: Optional[int] = None
    price_usd: Optional[float] = None
    group_size: Optional[str] = None
    style: Optional[str] = None
    summary: Optional[str] = None
    itinerary: Optional[list[ItineraryDay]] = None


class TourOut(TourBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ---------- Gallery ----------
class GalleryImageBase(BaseModel):
    image_path: str
    alt: str = ""
    category: str = "wildlife"


class GalleryImageCreate(GalleryImageBase):
    pass


class GalleryImageOut(GalleryImageBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    created_at: datetime


# ---------- Enquiry ----------
class EnquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    destination: Optional[str] = ""
    dates: Optional[str] = ""
    guests: Optional[int] = None
    message: Optional[str] = ""


class EnquiryUpdate(BaseModel):
    status: str


class EnquiryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    email: str
    phone: Optional[str] = ""
    destination: Optional[str] = ""
    dates: Optional[str] = ""
    guests: Optional[int] = None
    message: Optional[str] = ""
    status: str
    created_at: datetime


# ---------- Blog ----------
class BlogPostBase(BaseModel):
    slug: str
    title: str
    excerpt: str = ""
    body: str = ""
    cover_image: str = ""
    category: str = "guide"
    published: int = 1


class BlogPostCreate(BlogPostBase):
    pass


class BlogPostUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    excerpt: Optional[str] = None
    body: Optional[str] = None
    cover_image: Optional[str] = None
    category: Optional[str] = None
    published: Optional[int] = None


class BlogPostOut(BlogPostBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    created_at: datetime


# ---------- Newsletter ----------
class NewsletterSubscribeRequest(BaseModel):
    email: EmailStr


class NewsletterSubscriberOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    email: str
    created_at: datetime


# ---------- Media library ----------
class MediaAssetBase(BaseModel):
    title: str = ""
    image_path: str
    category: str = "promotion"
    active: int = 1


class MediaAssetCreate(MediaAssetBase):
    pass


class MediaAssetOut(MediaAssetBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    created_at: datetime


# ---------- Auth ----------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
