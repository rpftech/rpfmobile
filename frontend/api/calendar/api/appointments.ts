import {requests} from "../lib/requests";
import {CONFIG} from "../config";
import {
    AppointmentSlotParams, BookingParams,
    ErrorResponse,
    GetAppointmentsResponse,
    MarkedAppointmentSlot, PostBookingErrorResponse,
    PostBookingFormData,
    PostBookingResponse
} from "../types";
import Bookings from "./bookings";
import {datesMatch, formatDate, getDate, getFutureDate} from "../lib/date";

const FUTURE_DATE = getFutureDate({ month: 3 });

const getAppointmentSlots = async <Params>(params: Params[]): Promise<GetAppointmentsResponse[] | ErrorResponse> => {
    return requests.get<Params, GetAppointmentsResponse[]>(`${CONFIG.url}/services/${CONFIG.appointmentsServiceId}/slots`, params);
};

const bookAppointment = async(data: PostBookingFormData): Promise<PostBookingResponse | PostBookingErrorResponse> => {
    return requests.post<PostBookingResponse>(`${CONFIG.url}/bookings`, {
        booking: {
            ...data.booking,
            service_id: +CONFIG.appointmentsServiceId,
            public_booking: true
        },
        confirm: true
    });
};

const getAvailableAppointmentSlots = async(): Promise<MarkedAppointmentSlot[]> => {
    const results = await Promise.all([
        getAppointmentSlots<AppointmentSlotParams>([
            {to: FUTURE_DATE}
        ]),
        Bookings.getActiveBookings<BookingParams>([])
    ]);
    const [appointments, activeBookings] = results;
    if('error' in appointments) return [];
    const noActiveBookings = 'error' in activeBookings;
    const editedAppointments =  appointments.reduce<MarkedAppointmentSlot[]>((allAppointments, currAppointment) => {
        const currAppointmentDate = getDate(currAppointment.slot.timestamp);
        if(!allAppointments.length) return [
            ...allAppointments,
            {
                title: currAppointmentDate,
                data: [{
                    ...currAppointment.slot,
                    available: true
                }]
            }
        ];
        const groupedAppointmentSlot = allAppointments.find(appointment => appointment.title === currAppointmentDate);
        if (!groupedAppointmentSlot) return [
            ...allAppointments,
            {
                title: currAppointmentDate,
                data: [{
                    ...currAppointment.slot,
                    available: true
                }]
            }
        ];
        groupedAppointmentSlot.data.push({
            ...currAppointment.slot,
            available: true
        });
        return [
            ...allAppointments.filter(appointment => appointment.title !== currAppointmentDate),
            groupedAppointmentSlot
        ]
    }, []);
    if(noActiveBookings) return [];
    return activeBookings.reduce<MarkedAppointmentSlot[]>((allAppointmentsAndBookings, currBooking) => {
        const groupedAppointmentSlot = allAppointmentsAndBookings.find(slot => datesMatch(currBooking.booking.booked_from, slot.date));
        if (!groupedAppointmentSlot) return [
            ...allAppointmentsAndBookings,
            {
                title: getDate(currBooking.booking.booked_from),
                data: [{
                    timestamp: currBooking.booking.booked_from,
                    timestamp_end: currBooking.booking.booked_to,
                    formatted_timestamp: formatDate(currBooking.booking.booked_from),
                    formatted_timestamp_end: formatDate(currBooking.booking.booked_to),
                    available: false
                }]
            }
        ];
        groupedAppointmentSlot.data.push({
            timestamp: currBooking.booking.booked_from,
            timestamp_end: currBooking.booking.booked_to,
            formatted_timestamp: formatDate(currBooking.booking.booked_from),
            formatted_timestamp_end: formatDate(currBooking.booking.booked_to),
            available: false
        });
        return [
            ...allAppointmentsAndBookings.filter(slot => !datesMatch(currBooking.booking.booked_from, slot.title)),
            groupedAppointmentSlot
        ]
    }, editedAppointments) : [];
    return appointmentAndBookings.map(appointmentAndBooking => {
        return {
            ...appointmentAndBooking,
            data: appointmentAndBooking.data.sort((a,b) =>
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            )
        };
    }).sort((a, b) => new Date(a.title).getTime() - new Date(b.title).getTime());
    // return [
    //     ...editedAppointments,
    //     // Add appointments that are taken so we can show them in app MVP
    //     ...(!noActiveBookings ? activeBookings.map(activeBooking => ({
    //         title: new Date(activeBooking.booking.booked_from).toISOString().split('T')[0],
    //         data: [{
    //             timestamp: activeBooking.booking.booked_from,
    //             timestamp_end: activeBooking.booking.booked_to,
    //             formatted_timestamp: activeBooking.booking.booked_from,
    //             formatted_timestamp_end: activeBooking.booking.booked_from,
    //             available: false
    //         }]
    //     })) : [])
    // ].sort((a, b) => new Date(a.title).getTime() - new Date(b.title).getTime())
};

// getAppointmentSlots<AppointmentSlotParams>([
//     {to: FUTURE_DATE}
// ]).then(console.log)
//
// getActiveBookings<BookingParams>([
//     {end: FUTURE_DATE}
// ]).then(console.log)


// getAvailableAppointmentSlots().then(console.log)
// bookAppointment({
//     booking: {
//         booked_from: '2023-06-08T15:00:00+01:00',
//         booked_to: '2023-06-08T16:00:00+01:00',
//         person_attributes: {
//             name: 'Bob'
//         }
//     }
// }).then(console.log)

export default {
    getAvailableAppointmentSlots,
    bookAppointment,
    getAppointmentSlots
}