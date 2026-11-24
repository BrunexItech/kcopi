"""Seed 5 starter blog articles. Idempotent, skips any slug that already
exists, so it's safe to run again. Run with: python seed_blog.py
"""
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal, Base, engine
from app.models import BlogPost

Base.metadata.create_all(bind=engine)

POSTS = [
    {
        "slug": "best-time-to-visit-maasai-mara",
        "title": "When Is the Best Time to Visit the Maasai Mara?",
        "excerpt": "The honest answer depends on what you want to see. Here's how to pick your month.",
        "cover_image": "/static/img/gal-lion.jpg",
        "category": "planning",
        "body": (
            "There's no single \"best\" month for the Maasai Mara. There's a best month for what you specifically "
            "want to see, and the Mara rewards different travellers at different times of year.\n\n"
            "If the Great Migration river crossings are the reason you're coming, aim for July through October. "
            "This is when the wildebeest and zebra herds have pushed north from the Serengeti and are crossing the "
            "Mara River in search of fresh grazing: the single most dramatic wildlife spectacle in East Africa, and "
            "also the busiest and most expensive time to visit. Camps fill up six to nine months in advance for "
            "this window, so if a river crossing is non-negotiable for you, book early.\n\n"
            "If you'd rather have the plains closer to yourself, the shoulder months of June and November are "
            "underrated. The migration herds are either arriving or departing, resident wildlife (lion, leopard, "
            "elephant, and the Mara's famous big cats) is present year-round regardless, and lodge rates drop "
            "noticeably once the peak crowds thin out.\n\n"
            "January and February bring short rains and excellent light for photography, with green landscapes and "
            "fewer vehicles at sightings. March through May is the long rains: some camps close and roads can be "
            "difficult, but it's also the cheapest and quietest time to be in the Mara if you don't mind the "
            "occasional downpour and don't need a river crossing.\n\n"
            "Our honest recommendation: if you've never been and budget allows, July to October gives you the "
            "classic Mara experience most people picture. If you've been before, or you're drawn more to a quieter, "
            "more personal safari, the shoulder months are genuinely excellent and considerably better value."
        ),
    },
    {
        "slug": "kenya-tanzania-visa-guide",
        "title": "Kenya & Tanzania Visa Guide",
        "excerpt": "What most nationalities actually need to apply for, and how far ahead to do it.",
        "cover_image": "/static/img/gal-balloon.jpg",
        "category": "planning",
        "body": (
            "Visa requirements change periodically, so always confirm the current rules for your specific "
            "nationality before booking flights. Here's the general shape of what most travellers need for "
            "Kenya and Tanzania.\n\n"
            "Most nationalities visiting Kenya can apply for an eTA (Electronic Travel Authorization) online before "
            "arrival. It replaced the old visa-on-arrival and e-Visa systems, and applications are typically "
            "processed within a few days, though we recommend applying at least two weeks before travel to leave "
            "room for any follow-up document requests.\n\n"
            "Tanzania's e-Visa works similarly: apply online, upload a passport photo and your travel details, and "
            "you'll usually hear back within a week. If your itinerary crosses between Kenya and Tanzania (common "
            "on a combined Mara–Serengeti trip), you'll need valid entry documents for both countries separately.\n\n"
            "A few things that trip people up: your passport typically needs at least six months of validity "
            "remaining from your date of entry, and you'll often need proof of onward travel and sufficient funds. "
            "If you're transiting through a third country, check whether that country has its own transit visa "
            "requirements.\n\n"
            "Once your trip with us is confirmed, we send every guest the exact, current requirements and "
            "application links for their nationality, so you're never guessing or relying on a blog post that "
            "might be a year out of date by the time you travel."
        ),
    },
    {
        "slug": "complete-safari-packing-list",
        "title": "The Complete Safari Packing List",
        "excerpt": "What actually earns a place in your bag, from someone who's done this drive a hundred times.",
        "cover_image": "/static/img/gal-cheetah.jpg",
        "category": "guide",
        "body": (
            "Pack less than you think you need. Almost every camp offers a laundry service, vehicles have limited "
            "luggage space (especially on light-aircraft transfers between parks), and the single biggest packing "
            "mistake we see is guests bringing a hard-shell suitcase that physically doesn't fit in a safari vehicle "
            "or bush-plane hold. Use a soft duffel bag instead.\n\n"
            "Clothing: neutral colours such as khaki, olive, tan, and grey, rather than bright white (shows dust) or "
            "black and dark blue (attracts tsetse flies in some areas). Layers matter more than quantity: mornings on "
            "game drives can be genuinely cold, even near the equator, and it's often 30°C by mid-morning. A fleece "
            "or light jacket, a wide-brimmed hat, and a buff or scarf for dust cover the mornings; breathable "
            "long-sleeve shirts and trousers cover the heat and sun exposure during the day.\n\n"
            "Essentials that are easy to forget: a good pair of binoculars (shared pairs in the vehicle are fine, "
            "but your own means you never miss a sighting while waiting your turn), a portable charger for camera "
            "batteries and phones (power isn't always available in your tent during the day), and a basic "
            "first-aid kit with any personal medication, since pharmacies are not close to most camps.\n\n"
            "Sun protection is non-negotiable: high-SPF sunscreen, lip balm with SPF, and sunglasses. Malaria "
            "prophylaxis should be discussed with a travel clinic before you go, alongside insect repellent for "
            "evenings at camp.\n\n"
            "For camera gear: if wildlife photography is a priority, a zoom lens in the 100–400mm range covers "
            "almost everything you'll encounter. A beanbag or small tripod that rests on the vehicle's window frame "
            "is more practical than a full tripod, which rarely gets used on a moving game drive.\n\n"
            "What you genuinely don't need: formal clothing (even the most luxurious camps are smart-casual at "
            "most), excessive cash (most camps run a tab, settled by card at the end), or a second suitcase's worth "
            "of \"just in case\" items. Pack for the itinerary we send you, and trust that if you've forgotten "
            "something small, your guide will know how to help."
        ),
    },
    {
        "slug": "great-migration-month-by-month",
        "title": "Witnessing the Great Migration: A Month-by-Month Guide",
        "excerpt": "The migration never actually stops moving. Here's where the herds are, roughly, at each point in the year.",
        "cover_image": "/static/img/gal-migration.jpg",
        "category": "guide",
        "body": (
            "The Great Migration isn't a single event on a calendar. It's a continuous, roughly circular movement "
            "of over a million wildebeest and hundreds of thousands of zebra between the Serengeti (Tanzania) and "
            "the Maasai Mara (Kenya), following the rain and the grass. Here's the general pattern, though exact "
            "timing shifts a few weeks year to year depending on rainfall.\n\n"
            "December to March: the herds are in the southern Serengeti's short-grass plains, where the famous "
            "calving season happens: around 500,000 wildebeest calves are born within a few weeks each February, "
            "drawing predators in large numbers. This is one of the most underrated times to witness the "
            "migration.\n\n"
            "April to May: the herds begin moving north and west through the central and western Serengeti as the "
            "short-grass plains dry out, following the retreating rains.\n\n"
            "June to July: the migration pushes further north, and the first river crossings of the season begin, "
            "typically at the Grumeti River in the western Serengeti, where Nile crocodiles wait.\n\n"
            "July to October: this is peak Mara season. The herds cross the Mara River into Kenya, and this is "
            "when the crossings most people picture, thousands of wildebeest plunging down steep banks into "
            "crocodile-filled water, happen most frequently. Crossings can occur multiple times as herds move back "
            "and forth across the river chasing better grazing.\n\n"
            "November: the herds begin the long journey back south into the Serengeti as the short rains return, "
            "closing the loop before calving season starts again.\n\n"
            "The honest truth about river crossings: they're not scheduled, and no operator can guarantee you'll "
            "see one on a specific day. What we can guarantee is positioning you in the right area for the right "
            "weeks and having a guide who reads herd movement daily, which is the difference between getting lucky "
            "and being in the right place when luck happens."
        ),
    },
    {
        "slug": "planning-a-family-safari",
        "title": "Planning a Family Safari: Tips for Travelling With Kids in Kenya",
        "excerpt": "A safari with children looks different from a safari without them, in good ways, if you plan for it.",
        "cover_image": "/static/img/gal-maasai.jpg",
        "category": "guide",
        "body": (
            "A common worry we hear from parents is whether a safari is \"too much\" for young children: long game "
            "drives, early mornings, remote locations. In our experience, the opposite is usually true: kids are "
            "often more engaged by a safari than many adults, as long as the pace is built around them rather than "
            "around a typical adult itinerary.\n\n"
            "Age matters less than pace. We've run family trips for children as young as four, but the key "
            "adjustment is shorter game drives (90 minutes to two hours rather than a full morning), more breaks, "
            "and a private vehicle rather than a shared one, so there's no pressure to keep pace with other guests "
            "who might want to linger at a sighting longer than a restless seven-year-old can sit still for.\n\n"
            "Choose family-friendly accommodation deliberately. Some tented camps are adults-focused (open "
            "walkways between tents, unfenced camps where wildlife genuinely walks through at night) and "
            "explicitly don't accept children under a certain age for safety reasons. Others are built for "
            "families, with interconnecting tents, kids' activity programmes, and fenced perimeters. We match the "
            "camp to your children's ages, not the other way around.\n\n"
            "Combine, don't compromise. A common and very successful format is a shorter safari (3–4 days) paired "
            "with several days on the coast: Diani Beach gives children a chance to swim, run, and burn energy "
            "after a few days of sitting in a vehicle, and gives parents a more relaxed second half of the trip.\n\n"
            "Pack a \"spotting kit\": simple binoculars sized for small hands, a laminated animal checklist, and a "
            "notebook turn a long drive into a game rather than a wait. Most kids remember the hunt for the next "
            "animal more vividly than the animal itself.\n\n"
            "Health precautions need extra care with children: malaria prophylaxis options, sun exposure, and "
            "vaccination requirements all vary by age, so we strongly recommend a travel clinic consultation "
            "specifically for your children's ages well before departure, not just for the adults in the group."
        ),
    },
]


def run():
    db = SessionLocal()
    created = 0
    for post in POSTS:
        if db.query(BlogPost).filter(BlogPost.slug == post["slug"]).first():
            continue
        db.add(BlogPost(**post))
        created += 1
    db.commit()
    db.close()
    print(f"Created {created} new blog post(s) (skipped any already present).")


if __name__ == "__main__":
    run()
