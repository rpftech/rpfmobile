import React, {useState} from "react";
import {BookingFormState} from "../app";


interface ReturnType {
    bookingForm: BookingFormState;
    setBookingForm: React.Dispatch<React.SetStateAction<BookingFormState>>;
}


const useBookingForm = (): ReturnType => {
    const [bookingForm, setBookingForm] = useState<BookingFormState>({
        fullName: '',
        email: '',
        startTime: '',
        endTime: ''
    });

    return {bookingForm, setBookingForm};
};

export default useBookingForm;