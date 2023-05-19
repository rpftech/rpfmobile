import flask
from pydantic import ValidationError

from backend.services.calendar import combined_config
from backend.services.calendar.bookings import types
from backend.services.calendar.lib import request_methods

_SERVICE = "bookings"
api = flask.Blueprint(f"{_SERVICE}", __name__, url_prefix=f"/api/v1/{_SERVICE}")


# types.GetActiveBookingsResponse | generic_types.ErrorResponse
@api.route("/", methods=["GET"])
def get_active_bookings() -> tuple[str, int]:
    return request_methods.get(url=f"{combined_config.url}/bookings/upcoming"), 200


# types.GetActiveBookingsResponse | generic_types.ErrorResponse
@api.route("/", methods=["POST"])
def book_appointment() -> tuple[flask.Response, int]:
    body = flask.request.json
    try:
        if isinstance(body, dict):
            valid_body = types.PostBookingFormData(**body)
        else:
            return flask.jsonify({"message": "Body data is not valid!"}), 200
    except ValidationError as e:
        print(e)
        return flask.jsonify({"message": "Body data is not valid!"}), 200
    else:
        data = types.PostBookingRequest(
            booking=types.PostBookingRequestBooking(
                **valid_body.booking.dict(),
                service_id=int(combined_config.appointments_service_id),
                public_booking="true",
            ),
            confirm="true",
        )
        results = request_methods.post(url=f"{combined_config.url}/bookings", data=data)
        return flask.jsonify(results), 200
