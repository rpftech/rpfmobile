import {requests} from "../../lib/requests";
import {CONFIG} from "../../config";
import {
    ErrorResponse,
} from "../types";
import {
    GetActiveBookingsResponse,
    PostBookingErrorResponse,
    PostBookingFormData,
    PostBookingResponse,
    PostBookingRequest
} from "./types";

const getActiveBookings = async(params: {}): Promise<GetActiveBookingsResponse[] | ErrorResponse> => {
    return requests.get<GetActiveBookingsResponse[]>(`${CONFIG.url}/bookings/upcoming`, params);
};

const bookAppointment = async(data: PostBookingFormData): Promise<PostBookingResponse | PostBookingErrorResponse> => {
    return requests.post<PostBookingResponse, PostBookingRequest>(`${CONFIG.url}/bookings`, {
        booking: {
            ...data.booking,
            service_id: +CONFIG.appointmentsServiceId,
            public_booking: true
        },
        confirm: true
    });
};

export default {
    getActiveBookings,
    bookAppointment
}