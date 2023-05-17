import flask
from flask_cors import CORS

from backend import services


def create_app() -> flask.Flask:
    app = flask.Flask(__name__)
    CORS(app)
    app.register_blueprint(services.calendar.appointments)
    app.register_blueprint(services.calendar.bookings)
    return app


app = create_app()
