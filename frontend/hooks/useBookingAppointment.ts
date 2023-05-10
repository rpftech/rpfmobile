import React, {useState} from "react";

export interface BookAppointmentStatusState {
    loading: boolean;
    loaded: boolean;
    error: boolean;
}

interface ReturnTypes {
    bookAppointmentStatus: BookAppointmentStatusState;
    setBookAppointmentStatus: React.Dispatch<React.SetStateAction<BookAppointmentStatusState>>;
};

export const defaultBookAppointmentStatus: BookAppointmentStatusState = {
    loading: false,
    loaded: false,
    error: false
};

const useBookingAppointment = (): ReturnTypes => {
    const [bookAppointmentStatus, setBookAppointmentStatus] = useState<BookAppointmentStatusState>(defaultBookAppointmentStatus);

    return {bookAppointmentStatus, setBookAppointmentStatus};

};

export default useBookingAppointment;