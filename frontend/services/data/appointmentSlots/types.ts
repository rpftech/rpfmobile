import {AppointmentSlot} from "../../api/calendar/api/appointments/types";

export interface AvailableAppointmentSlot extends AppointmentSlot {
    available: boolean;
};

export interface MarkedAppointmentSlot {
    date: string;
    data: AvailableAppointmentSlot[];
};