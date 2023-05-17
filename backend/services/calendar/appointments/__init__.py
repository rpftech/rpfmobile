from typing import Any

import flask

# from backend.services.calendar import types as generic_types
# from backend.services.calendar.appointments import types
from backend.services.calendar import combined_config
from backend.services.calendar.lib import request_methods

_SERVICE = "appointments"
api = flask.Blueprint(f"{_SERVICE}", __name__, url_prefix=f"/api/v1/{_SERVICE}")


# types.GetAppointmentsResponse | generic_types.ErrorResponse
@api.route("/", methods=["GET"])
def get_appointment_slots() -> tuple[str, Any]:
    return (
        request_methods.get(
            url=f"{combined_config.url}/services/{combined_config.appointments_service_id}/slots"  # type: ignore
        ),
        200,
    )
