import {requests} from "../lib/requests";
import {CONFIG} from "../config";
import {ErrorResponse, GetActiveBookingsResponse} from "../types";

const getActiveBookings = async<Params>(params: Params[]): Promise<GetActiveBookingsResponse[] | ErrorResponse> => {
    return requests.get<Params, GetActiveBookingsResponse>(`${CONFIG.url}/bookings/upcoming`, params);
};

export default {
    getActiveBookings
}