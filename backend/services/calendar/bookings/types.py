from typing import Any, List

from pydantic import BaseModel


class GetActiveBookingsData(BaseModel):
    booked_from: str
    booked_to: str
    created_at: str
    custom_data: List[Any]  # TBC
    count: int
    expires_at: str
    external_id: str
    id: int
    notes: str
    person_id: int
    resource_id: int
    service_id: int
    state: str
    status: str
    updated_at: str


class GetActiveBookingsResponse(BaseModel):
    booking: GetActiveBookingsData


class PostBookingRequestBookingPersonAttributes(BaseModel):
    name: str


class PostBookingFormDataBooking(BaseModel):
    booked_from: str
    booked_to: str
    person_attributes: PostBookingRequestBookingPersonAttributes


class PostBookingFormData(BaseModel):
    booking: PostBookingFormDataBooking


class PostBookingRequestBooking(BaseModel):
    service_id: int
    booked_from: str
    booked_to: str
    person_attributes: PostBookingRequestBookingPersonAttributes
    public_booking: bool


class PostBookingRequest(BaseModel):
    booking: PostBookingRequestBooking
    confirm: bool
