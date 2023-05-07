export interface AppointmentSlotParams {
    to?: string;
};

export interface BookingParams {
    start?: string;
    end?: string;
};

export interface AppointmentSlot {
    timestamp: string;
    timestamp_end: string;
    formatted_timestamp: string;
    formatted_timestamp_end: string;
    // free: number;
    // available_resources: number[];
    // maximum_capacity: number;
}

export interface AvailableAppointmentSlot extends AppointmentSlot {
    available: boolean;
}

export interface GetAppointmentsResponse {
    slot: AppointmentSlot;
};

export interface MarkedAppointmentSlot {
    title: string;
    data: AvailableAppointmentSlot[];
};

export interface MarkedDate {
    [key: string]: {
        marked?: boolean;
        disabled?: boolean;
    }
}

export interface GetActiveBookingsData {
    "booked_from": string;
    "booked_to": string;
    "created_at": string;
    "custom_data": any[],  // TBC
    "count": number;
    "expires_at": string,
    "external_id": string,
    "id": number;
    "notes": string;
    "person_id": number;
    "resource_id": number;
    "service_id": number;
    "state": string;
    "status": string,
    "updated_at": string;
}

export interface GetActiveBookingsResponse {
    booking: GetActiveBookingsData;
};

export interface PostBookingFormData {
    booking: {
        booked_from: string;
        booked_to: string;
        person_attributes: {
            name: string;
        };
    }
}

export interface PostBookingResponse {
    booking: GetActiveBookingsData & {
        id: number;
        verification_code: string;
        expires_at: string;
        count: number;
        revision_count: number;
        notes: any; // TBC
        paid_at: string;
        paid_amount: any; // TBC
        event_id: number;
        collection_id: number;
        active: boolean;
        invoiced_at: string;
        reminder_at: string;
        reminded_at: string;
        verification_method: string;
        person: any; // Person object
        resource: {
            id: number;
            title: string;
        };
        service: {
            id: number;
            title: string;
        };
    };
};

export interface PostBookingInvalidParams {
    'person.base'?: string[];
    resource?: string[];
    resource_id?: string[];
    booked_from?: string[];
    booked_to?: string[];
    person?: string[];
    person_attributes?: {
        base: string[]
    };
};

export interface GetFutureDataParams {
    year: number;
    month: number;
    date: number
};

export interface ErrorResponse {
    error: {
        description: string;
    }
};

export interface PostBookingRequest {
    booking: {
        service_id: number;
        booked_from: string;
        booked_to: string;
        person_attributes: {
            name: string;
        };
        public_booking: boolean;
    }
    confirm: boolean
};

export interface PostBookingRequest {
    booking: {
        service_id: number;
        booked_from: string;
        booked_to: string;
        person_attributes: {
            name: string;
        };
        public_booking: boolean;
    }
    confirm: boolean
};

export type PostBookingErrorResponse = PostBookingInvalidParams | ErrorResponse;