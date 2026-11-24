"""Seed the Kcopi Global database with real content: 6 destinations, 6 tours,
gallery images, and one admin user. Run with: python seed.py
"""
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database import Base, engine, SessionLocal
from app.models import Destination, Tour, GalleryImage, AdminUser
from app.auth import hash_password

IMG = "/static/img/{}.jpg"

DESTINATIONS = [
    dict(
        slug="masai-mara", name="Maasai Mara", country="Kenya",
        tagline="Big Cats & the Great Migration",
        best_time="July – October",
        blurb="Kenya's most celebrated reserve: rolling savannah, the Mara River crossings, and the "
              "highest lion density in East Africa. Home base of the Maasai people and the final stage "
              "of the Great Migration.",
        highlights=[
            "Witness the Great Migration river crossings (Jul–Oct)",
            "Track the Marsh Pride and resident leopards",
            "Visit an authentic Maasai village",
            "Sunrise hot-air balloon safaris over the plains",
        ],
        hero_image=IMG.format("dest-masai-mara-hero"),
        split_image=IMG.format("dest-masai-mara-hero"),
        cta_image=IMG.format("dest-masai-mara-cta"),
        tour_count=14,
    ),
    dict(
        slug="amboseli", name="Amboseli", country="Kenya",
        tagline="Elephants under Kilimanjaro",
        best_time="June – September, January – February",
        blurb="Famous for enormous elephant herds photographed against the snow-capped backdrop of "
              "Mount Kilimanjaro, one of the most iconic images in African safari travel.",
        highlights=[
            "Large free-roaming elephant herds up close",
            "Classic Kilimanjaro backdrop photography",
            "Birdlife around Amboseli's swamps",
            "Cultural visits with local Maasai guides",
        ],
        hero_image=IMG.format("dest-amboseli-hero"),
        split_image=IMG.format("dest-amboseli-split"),
        cta_image=IMG.format("dest-amboseli-cta"),
        tour_count=9,
    ),
    dict(
        slug="serengeti", name="Serengeti", country="Tanzania",
        tagline="Endless Plains",
        best_time="June – September (migration), December – March (calving)",
        blurb="The Serengeti's vast, treeless plains host the largest terrestrial mammal migration on "
              "Earth and some of Africa's most dependable predator sightings year-round.",
        highlights=[
            "1.5 million wildebeest on the move",
            "Big cat density among the highest in Africa",
            "Seronera Valley year-round game viewing",
            "Seasonal calving season in the southern plains",
        ],
        hero_image=IMG.format("dest-serengeti-hero"),
        split_image=IMG.format("dest-serengeti-split"),
        cta_image=IMG.format("dest-serengeti-cta"),
        tour_count=11,
    ),
    dict(
        slug="tsavo", name="Tsavo East & West", country="Kenya",
        tagline="Red Elephants & Lava Flows",
        best_time="June – October, January – February",
        blurb="Kenya's largest protected ecosystem: rugged, remote, and far less crowded, famous for "
              "its red-dust elephants, man-eater history, and dramatic volcanic scenery.",
        highlights=[
            "Red-dust elephants bathing at Mudanda Rock",
            "Mzima Springs hippo and crocodile pools",
            "Lugard Falls on the Galana River",
            "Low-traffic, remote wilderness feel",
        ],
        hero_image=IMG.format("dest-tsavo-hero"),
        split_image=IMG.format("dest-tsavo-split"),
        cta_image=IMG.format("dest-tsavo-cta"),
        tour_count=6,
    ),
    dict(
        slug="lake-nakuru", name="Lake Nakuru", country="Kenya",
        tagline="Flamingos & Rhino Sanctuary",
        best_time="Year-round",
        blurb="A compact, alkaline lake park and rhino sanctuary, ideal as a short add-on safari, with "
              "dense birdlife and some of the best odds anywhere of spotting both black and white rhino.",
        highlights=[
            "Both black and white rhino sightings",
            "Flamingo flocks along the shoreline",
            "Tree-climbing lions in Acacia woodland",
            "Easiest short safari add-on from Nairobi",
        ],
        hero_image=IMG.format("dest-nakuru-hero"),
        split_image=IMG.format("dest-nakuru-split"),
        cta_image=IMG.format("dest-nakuru-cta"),
        tour_count=5,
    ),
    dict(
        slug="diani-beach", name="Diani Beach", country="Kenya",
        tagline="Indian Ocean Coastal Escape",
        best_time="December – March, July – October",
        blurb="Powder-white sand and turquoise water on Kenya's south coast: the perfect place to "
              "unwind after a dusty safari, with coral reefs, dhow cruises, and barefoot luxury resorts.",
        highlights=[
            "14km of white-sand beach",
            "Snorkelling and diving on coral reefs",
            "Traditional dhow sunset cruises",
            "Easy fly-in combo with any safari itinerary",
        ],
        hero_image=IMG.format("dest-diani-hero"),
        split_image=IMG.format("dest-diani-split"),
        cta_image=IMG.format("dest-diani-cta"),
        tour_count=7,
    ),
]

TOURS = [
    dict(
        slug="masai-mara-classic-safari", title="Maasai Mara Classic Safari", category="wildlife",
        destination_name="Maasai Mara", hero_image=IMG.format("tour-masai-mara-classic"),
        days=4, nights=3, price_usd=950, group_size="2–7 guests", style="Lodge & Tented Camp",
        summary="A fast-paced introduction to Kenya's flagship reserve: game drives morning and "
                "evening, a Maasai village visit, and prime predator territory.",
        itinerary=[
            {"label": "Day 1", "title": "Nairobi to Maasai Mara",
             "desc": "Morning flight or road transfer into the Mara. Afternoon game drive en route to camp, settling in before sundowners."},
            {"label": "Day 2", "title": "Full-Day Game Drive",
             "desc": "Early start chasing the Marsh Pride and resident leopards, picnic breakfast on the plains, afternoon drive toward the Mara River."},
            {"label": "Day 3", "title": "Maasai Village & Migration Zone",
             "desc": "Morning cultural visit to a Maasai village, afternoon exploring the river-crossing points (seasonal) and Oloololo Escarpment."},
            {"label": "Day 4", "title": "Morning Game Drive & Departure",
             "desc": "Final sunrise game drive, breakfast at camp, transfer back to Nairobi."},
        ],
    ),
    dict(
        slug="great-migration-serengeti", title="Great Migration Serengeti Safari", category="wildlife",
        destination_name="Serengeti, Tanzania", hero_image=IMG.format("tour-serengeti-migration"),
        days=6, nights=5, price_usd=2150, group_size="2–6 guests", style="Mobile Tented Camp",
        summary="A six-day deep dive into the Serengeti ecosystem, timed around the Great Migration, "
                "following the herds with an expert tracking guide.",
        itinerary=[
            {"label": "Day 1", "title": "Arusha to Central Serengeti",
             "desc": "Fly into the Serengeti, afternoon game drive through the Seronera Valley."},
            {"label": "Day 2-3", "title": "Migration Tracking",
             "desc": "Two full days following herd movements with our resident tracker, picnic lunches on the plains."},
            {"label": "Day 4", "title": "Northern Serengeti / Mara River",
             "desc": "Transfer north toward river-crossing territory (seasonal), game drives en route."},
            {"label": "Day 5", "title": "Full-Day in the Migration Corridor",
             "desc": "Extended game drive focused on predator-prey action around the crossing points."},
            {"label": "Day 6", "title": "Final Drive & Departure",
             "desc": "Sunrise drive, breakfast, transfer to the airstrip."},
        ],
    ),
    dict(
        slug="amboseli-kilimanjaro-safari", title="Amboseli & Kilimanjaro View Safari", category="wildlife",
        destination_name="Amboseli", hero_image=IMG.format("tour-amboseli-kili"),
        days=3, nights=2, price_usd=620, group_size="2–7 guests", style="Lodge",
        summary="A short, scenic safari built around elephant herds and the best photographic angles "
                "of Mount Kilimanjaro.",
        itinerary=[
            {"label": "Day 1", "title": "Nairobi to Amboseli",
             "desc": "Scenic drive via Namanga, afternoon game drive with Kilimanjaro views."},
            {"label": "Day 2", "title": "Full-Day Elephant Safari",
             "desc": "Morning and evening drives among Amboseli's famous elephant herds, swamp-side birdwatching at midday."},
            {"label": "Day 3", "title": "Sunrise Drive & Departure",
             "desc": "Early photography drive for the clearest Kilimanjaro views, breakfast, return to Nairobi."},
        ],
    ),
    dict(
        slug="kenya-family-safari-beach", title="Kenya Family Safari & Beach Combo", category="family",
        destination_name="Maasai Mara + Diani Beach", hero_image=IMG.format("tour-family-beach"),
        days=8, nights=7, price_usd=2480, group_size="Families & groups",
        style="Family-Friendly Lodge & Beach Resort",
        summary="The best of both worlds for families: four days of wildlife in the Mara paced for "
                "children, followed by four relaxed days on Diani's beaches.",
        itinerary=[
            {"label": "Day 1-2", "title": "Maasai Mara Arrival & Game Drives",
             "desc": "Family-paced game drives with shorter outings and child-friendly guiding."},
            {"label": "Day 3", "title": "Cultural Day",
             "desc": "Maasai village visit and a relaxed morning at camp before an afternoon drive."},
            {"label": "Day 4", "title": "Fly to the Coast",
             "desc": "Transfer flight from the Mara to Diani Beach, afternoon free to settle in."},
            {"label": "Day 5-7", "title": "Beach Days",
             "desc": "Snorkelling, dhow cruise, and resort activities for the whole family."},
            {"label": "Day 8", "title": "Departure",
             "desc": "Final morning at leisure before transfer to the airport."},
        ],
    ),
    dict(
        slug="honeymoon-safari-escape", title="Honeymoon Safari Escape", category="honeymoon",
        destination_name="Maasai Mara + Diani Beach", hero_image=IMG.format("tour-honeymoon"),
        days=5, nights=4, price_usd=1980, group_size="Couples", style="Luxury Tented Camp & Beach Villa",
        summary="A romance-first itinerary: private game drives, a bush dinner under the stars, and a "
                "closing stay in a private beach villa.",
        itinerary=[
            {"label": "Day 1", "title": "Arrival in the Mara",
             "desc": "Private transfer into camp, sundowner game drive to welcome the evening."},
            {"label": "Day 2", "title": "Private Game Drive & Bush Dinner",
             "desc": "Exclusive-use vehicle game drive by day, candle-lit bush dinner under the stars at night."},
            {"label": "Day 3", "title": "Hot-Air Balloon & Transfer to the Coast",
             "desc": "Sunrise balloon safari with champagne breakfast, afternoon flight to Diani."},
            {"label": "Day 4", "title": "Beach Villa Day",
             "desc": "Full day at leisure in a private beach villa, optional sunset dhow cruise."},
            {"label": "Day 5", "title": "Departure",
             "desc": "Relaxed morning, transfer to the airport."},
        ],
    ),
    dict(
        slug="tsavo-nakuru-explorer", title="Tsavo & Lake Nakuru Explorer", category="wildlife",
        destination_name="Tsavo & Lake Nakuru", hero_image=IMG.format("tour-tsavo-nakuru"),
        days=5, nights=4, price_usd=1340, group_size="2–7 guests", style="Lodge & Tented Camp",
        summary="An off-the-beaten-path route for returning safari-goers, featuring red-dust elephants "
                "in Tsavo and rhino tracking at Lake Nakuru.",
        itinerary=[
            {"label": "Day 1", "title": "Nairobi to Tsavo East",
             "desc": "Drive to Tsavo, afternoon game drive to Mudanda Rock."},
            {"label": "Day 2", "title": "Full-Day Tsavo East",
             "desc": "Mzima Springs and the Galana River, searching for the park's famous red elephants."},
            {"label": "Day 3", "title": "Transfer to Lake Nakuru",
             "desc": "Scenic drive through the Rift Valley, afternoon rhino-tracking drive."},
            {"label": "Day 4", "title": "Full-Day Lake Nakuru",
             "desc": "Flamingo shoreline and tree-climbing lion territory in Acacia woodland."},
            {"label": "Day 5", "title": "Departure",
             "desc": "Morning drive, return transfer to Nairobi."},
        ],
    ),
]

GALLERY = [
    ("gal-lion", "Lion in the Maasai Mara", "wildlife"),
    ("gal-elephant", "African elephant herd", "wildlife"),
    ("gal-giraffe", "Masai giraffe", "wildlife"),
    ("gal-zebra", "Zebra herd on the savanna", "wildlife"),
    ("gal-migration", "Wildebeest river crossing", "wildlife"),
    ("gal-leopard", "Leopard resting in a tree", "wildlife"),
    ("gal-cheetah", "Cheetah on safari", "wildlife"),
    ("gal-rhino", "Black rhino, Kenya", "wildlife"),
    ("gal-flamingo", "Flamingos at Lake Nakuru", "wildlife"),
    ("gal-beach", "Diani Beach, Kenya coast", "beach"),
    ("gal-balloon", "Hot air balloon safari, Maasai Mara", "experience"),
    ("gal-maasai", "Maasai cultural visit", "culture"),
]


def main():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if db.query(Destination).count() == 0:
            for d in DESTINATIONS:
                db.add(Destination(**d))
            print(f"Seeded {len(DESTINATIONS)} destinations")
        else:
            print("Destinations already seeded, skipping")

        if db.query(Tour).count() == 0:
            for t in TOURS:
                db.add(Tour(**t))
            print(f"Seeded {len(TOURS)} tours")
        else:
            print("Tours already seeded, skipping")

        if db.query(GalleryImage).count() == 0:
            for key, alt, category in GALLERY:
                db.add(GalleryImage(image_path=IMG.format(key), alt=alt, category=category))
            print(f"Seeded {len(GALLERY)} gallery images")
        else:
            print("Gallery already seeded, skipping")

        admin_email = "admin@kcopiglobal.co.ke"
        if not db.query(AdminUser).filter(AdminUser.email == admin_email).first():
            db.add(AdminUser(email=admin_email, hashed_password=hash_password("ChangeMe123!")))
            print(f"Created admin user: {admin_email} / ChangeMe123!  <-- CHANGE THIS PASSWORD")
        else:
            print("Admin user already exists, skipping")

        db.commit()
        print("Seed complete.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
