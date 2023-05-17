from pydantic import BaseModel


class ErrorResponseDescription(BaseModel):
    description: str


class ErrorResponse(BaseModel):
    error: ErrorResponseDescription
