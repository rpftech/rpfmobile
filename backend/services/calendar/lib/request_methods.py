import flask
import requests
from pydantic import BaseModel

from backend.services.calendar import combined_config


def get(url: str) -> str:
    response = requests.get(
        url=url,
        params={**flask.request.args},
        headers={
            "Accept": "application/json",
            "Authorization": f"Bearer {combined_config.api_key}",
            "User-Agent": f"{combined_config.app_name}",
        },
    )
    return response.json()


def post(url: str, data: BaseModel) -> str:
    response = requests.post(
        url=url,
        headers={
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Bearer {combined_config.api_key}",
            "User-Agent": f"{combined_config.app_name}",
        },
        json=data.dict(),
    )
    return response.json()
