# Types and config settings needed by API routes
from backend.services.calendar import types as generic_types

# API routes
from backend.services.calendar.appointments import api as appointments
from backend.services.calendar.bookings import api as bookings
from backend.services.calendar.config import combined_config
