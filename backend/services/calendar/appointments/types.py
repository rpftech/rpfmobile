from pydantic import BaseModel


class AppointmentSlot(BaseModel):
    timestamp: str
    timestamp_end: str
    formatted_timestamp: str
    formatted_timestamp_end: str


class GetAppointmentsResponse(BaseModel):
    slot: AppointmentSlot
