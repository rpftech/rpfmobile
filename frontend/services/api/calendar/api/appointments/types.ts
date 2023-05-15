export interface AppointmentSlot {
    timestamp: string;
    timestamp_end: string;
    formatted_timestamp: string;
    formatted_timestamp_end: string;
    // free: number;
    // available_resources: number[];
    // maximum_capacity: number;
};

export interface GetAppointmentsResponse {
    slot: AppointmentSlot;
};