import {MarkedAppointmentSlot} from "./types";
import Calendar from "../../api/calendar";
import {datesMatch, formatDate, getDateFromString, getFutureDate} from "../../../lib/dates";

const FUTURE_DATE = getDateFromString(getFutureDate({ month: 3 }));

export const getAvailableAppointmentSlots = async(): Promise<MarkedAppointmentSlot[]> => {
    const results = await Promise.all([
        Calendar.Appointments.getAppointmentSlots({to: FUTURE_DATE}),
        Calendar.Bookings.getActiveBookings({})
    ]);
    const [appointments, activeBookings] = results;
    if('error' in appointments) return [];
    const noActiveBookings = 'error' in activeBookings;
    const editedAppointments =  appointments.reduce<MarkedAppointmentSlot[]>((allAppointments, currAppointment) => {
        const currAppointmentDate = getDateFromString(new Date(currAppointment.slot.timestamp));
        if(!allAppointments.length) return [
            ...allAppointments,
            {
                date: currAppointmentDate,
                data: [{
                    ...currAppointment.slot,
                    available: true
                }]
            }
        ];
        const groupedAppointmentSlot = allAppointments.find(appointment => appointment.date === currAppointmentDate);
        if (!groupedAppointmentSlot) return [
            ...allAppointments,
            {
                date: currAppointmentDate,
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
            ...allAppointments.filter(appointment => appointment.date !== currAppointmentDate),
            groupedAppointmentSlot
        ]
    }, []);
    if(noActiveBookings) return [];
    return activeBookings.reduce<MarkedAppointmentSlot[]>((allAppointmentsAndBookings, currBooking) => {
        const groupedAppointmentSlot = allAppointmentsAndBookings.find(slot =>
            datesMatch(new Date(currBooking.booking.booked_from), new Date(slot.date))
        );
        if (!groupedAppointmentSlot) return [
            ...allAppointmentsAndBookings,
            {
                date: getDateFromString(new Date(currBooking.booking.booked_from)),
                data: [{
                    timestamp: currBooking.booking.booked_from,
                    timestamp_end: currBooking.booking.booked_to,
                    formatted_timestamp: formatDate(new Date(currBooking.booking.booked_from)),
                    formatted_timestamp_end: formatDate(new Date(currBooking.booking.booked_to)),
                    available: false
                }]
            }
        ];
        groupedAppointmentSlot.data.push({
            timestamp: currBooking.booking.booked_from,
            timestamp_end: currBooking.booking.booked_to,
            formatted_timestamp: formatDate(new Date(currBooking.booking.booked_from)),
            formatted_timestamp_end: formatDate(new Date(currBooking.booking.booked_to)),
            available: false
        });
        return [
            ...allAppointmentsAndBookings.filter(
                slot => !datesMatch(new Date(currBooking.booking.booked_from), new Date(slot.date))
            ),
            groupedAppointmentSlot
        ]
    }, editedAppointments)
        .map(appointmentAndBooking => {
            return {
                ...appointmentAndBooking,
                data: appointmentAndBooking.data.sort((a,b) =>
                    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                )
            };
        }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    // return [
    //     ...editedAppointments,
    //     // Add appointments that are taken so we can show them in app MVP
    //     ...(!noActiveBookings ? activeBookings.map(activeBooking => ({
    //         date: new Date(activeBooking.booking.booked_from).toISOString().split('T')[0],
    //         data: [{
    //             timestamp: activeBooking.booking.booked_from,
    //             timestamp_end: activeBooking.booking.booked_to,
    //             formatted_timestamp: activeBooking.booking.booked_from,
    //             formatted_timestamp_end: activeBooking.booking.booked_from,
    //             available: false
    //         }]
    //     })) : [])
    // ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
};
