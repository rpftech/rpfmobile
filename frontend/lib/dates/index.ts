import {TimeOptions, GetFutureDataParamsMethods, MarkedDate} from "./types";
import {MarkedAppointmentSlot} from '../../services/data/appointmentSlots/types';

export const getDate = (date: string): string => {
    return new Date(date).toISOString().split('T')[0];
};

export const formatDate = (date: string): string => {
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: false
    };
    const dateObj = new Date(date);
    const formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(dateObj);
    const formattedTime = new Intl.DateTimeFormat("en-GB", timeOptions).format(dateObj);
    return `${formattedDate}, ${formattedTime}`;
}

export const datesMatch = (date1: string, date2: string): boolean => {
    return new Date(getDate(date1)).getTime() === new Date(getDate(date2)).getTime()
};

export const getDateTimeRange = (startDate: string, endDate: string, dates: string[], markedDates: MarkedDate[] = []): MarkedDate[] => {
    if(startDate === endDate) return markedDates;
    if(dates.includes(startDate)) {
        const startDateObj = new Date(startDate);
        startDateObj.setDate(startDateObj.getDate() + 1);
        const editedMarkedDates = [
            ...markedDates,
            {
                date: startDate,
                disabled: false
            }
        ];
        return getDateTimeRange(getDate(startDateObj.toISOString()), endDate, dates, editedMarkedDates);
    };
    const startDateObj = new Date(startDate);
    const editedMarkedDates = [
        ...markedDates,
        {
            date: getDate(startDateObj.toISOString()),
            disabled: true
        }
    ]
    startDateObj.setDate(startDateObj.getDate() + 1);
    return getDateTimeRange(getDate(startDateObj.toISOString()), endDate, dates, editedMarkedDates);
};

export const createDateTimeline = (availableAppointmentSlots: MarkedAppointmentSlot[]): MarkedDate[] => {
    const startDate = getDate(new Date().toISOString());
    const endSlot = availableAppointmentSlots.at(-1);
    const dates = availableAppointmentSlots.map(availableAppointmentSlot => availableAppointmentSlot.date);
    return getDateTimeRange(startDate, endSlot.date, dates);
};

// const getFutureDateByYear = (date: Date, time: number): Date => {
//     const copiedDate = new Date(date.getTime());
//     copiedDate.setFullYear(copiedDate.getFullYear() + time);
//     return copiedDate
// };
//
// const getFutureDateByMonth = (date: Date, time: number): Date => {
//     const copiedDate = new Date(date.getTime());
//     copiedDate.setMonth(copiedDate.getMonth() + time);
//     return copiedDate
// };

const getFutureDateByTimeOptions = (params: TimeOptions): Date => {
    const editedDate = new Date();
    if(params.year) editedDate.setFullYear(editedDate.getFullYear() + params.year);
    if(params.month) editedDate.setMonth(editedDate.getMonth() + params.month);
    if(params.day) editedDate.setDate(editedDate.getDate() + params.day);
    return editedDate;
};

export const getFutureDate = (dateObj: TimeOptions): string => {
    return getDate(getFutureDateByTimeOptions(dateObj).toISOString());
};