import time
import httpx
from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["fx"])

# Static fallback — close to real rates at time of writing, used whenever the
# live lookup fails or is unreachable (offline dev, blocked egress, API
# outage). The currency feature must never break because of this.
FALLBACK_RATES = {"USD": 1.0, "KES": 129.0, "EUR": 0.92, "GBP": 0.79}
SUPPORTED = ("USD", "KES", "EUR", "GBP")

_cache: dict = {"rates": None, "fetched_at": 0.0}
CACHE_TTL_SECONDS = 12 * 60 * 60  # 12 hours


@router.get("/fx-rates")
def get_fx_rates():
    now = time.time()
    if _cache["rates"] and (now - _cache["fetched_at"]) < CACHE_TTL_SECONDS:
        return {"base": "USD", "rates": _cache["rates"], "source": "cache"}

    try:
        resp = httpx.get("https://open.er-api.com/v6/latest/USD", timeout=3.0)
        resp.raise_for_status()
        data = resp.json()
        live = data.get("rates", {})
        rates = {code: live[code] for code in SUPPORTED if code in live}
        if "USD" not in rates:
            rates["USD"] = 1.0
        if len(rates) == len(SUPPORTED):
            _cache["rates"] = rates
            _cache["fetched_at"] = now
            return {"base": "USD", "rates": rates, "source": "live"}
    except Exception:
        pass

    return {"base": "USD", "rates": FALLBACK_RATES, "source": "fallback"}
