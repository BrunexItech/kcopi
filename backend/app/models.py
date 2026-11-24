from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Float, DateTime, JSON
from .database import Base


def now_utc():
    return datetime.now(timezone.utc)


class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    country = Column(String, nullable=False)
    tagline = Column(String, nullable=False, default="")
    best_time = Column(String, nullable=False, default="")
    blurb = Column(Text, nullable=False, default="")
    highlights = Column(JSON, nullable=False, default=list)
    hero_image = Column(String, nullable=False, default="")
    split_image = Column(String, nullable=False, default="")
    cta_image = Column(String, nullable=False, default="")
    tour_count = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, default=now_utc)
    updated_at = Column(DateTime, default=now_utc, onupdate=now_utc)


class Tour(Base):
    __tablename__ = "tours"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False, default="wildlife")  # wildlife | family | honeymoon
    destination_name = Column(String, nullable=False, default="")
    hero_image = Column(String, nullable=False, default="")
    days = Column(Integer, nullable=False, default=1)
    nights = Column(Integer, nullable=False, default=0)
    price_usd = Column(Float, nullable=False, default=0)
    group_size = Column(String, nullable=False, default="")
    style = Column(String, nullable=False, default="")
    summary = Column(Text, nullable=False, default="")
    itinerary = Column(JSON, nullable=False, default=list)  # [{label,title,desc}]
    created_at = Column(DateTime, default=now_utc)
    updated_at = Column(DateTime, default=now_utc, onupdate=now_utc)


class GalleryImage(Base):
    __tablename__ = "gallery_images"

    id = Column(Integer, primary_key=True, index=True)
    image_path = Column(String, nullable=False)
    alt = Column(String, nullable=False, default="")
    category = Column(String, nullable=False, default="wildlife")
    created_at = Column(DateTime, default=now_utc)


class Enquiry(Base):
    __tablename__ = "enquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True, default="")
    destination = Column(String, nullable=True, default="")
    dates = Column(String, nullable=True, default="")
    guests = Column(Integer, nullable=True)
    message = Column(Text, nullable=True, default="")
    status = Column(String, nullable=False, default="new")  # new | contacted | closed
    created_at = Column(DateTime, default=now_utc)


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    excerpt = Column(Text, nullable=False, default="")
    body = Column(Text, nullable=False, default="")  # markdown-ish: paragraphs separated by \n\n
    cover_image = Column(String, nullable=False, default="")
    category = Column(String, nullable=False, default="guide")
    published = Column(Integer, nullable=False, default=1)  # 1/0 — sqlite has no real bool
    created_at = Column(DateTime, default=now_utc)
    updated_at = Column(DateTime, default=now_utc, onupdate=now_utc)


class NewsletterSubscriber(Base):
    __tablename__ = "newsletter_subscribers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=now_utc)


class MediaAsset(Base):
    __tablename__ = "media_assets"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, default="")
    image_path = Column(String, nullable=False)
    category = Column(String, nullable=False, default="promotion")  # promotion | poster | general
    active = Column(Integer, nullable=False, default=1)
    created_at = Column(DateTime, default=now_utc)


class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=now_utc)
