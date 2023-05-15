import {requests} from "../../lib/requests";
import {CONFIG} from "../../config";
import {
    ErrorResponse,
} from "../types";
import {
    GetAppointmentsResponse,
} from "./types";

const getAppointmentSlots = async (params: {}): Promise<GetAppointmentsResponse[] | ErrorResponse> => {
    return requests.get<GetAppointmentsResponse[]>(`${CONFIG.url}/services/${CONFIG.appointmentsServiceId}/slots`, params);
};

export default {
    getAppointmentSlots
}