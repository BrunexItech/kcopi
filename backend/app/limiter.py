from slowapi import Limiter
from slowapi.util import get_remote_address

# Shared rate limiter instance — imported by main.py (to register it on the
# app) and by any router that wants to decorate a route with @limiter.limit().
# Lives in its own module so routers never need to import from main.py,
# which would be a circular import.
limiter = Limiter(key_func=get_remote_address)
