import {TimeOptions, MarkedDate} from "./types";
import {MarkedAppointmentSlot} from '../../services/data/appointmentSlots/types';

export const STANDARD_DATE_FORMAT = 'YYYY-MM-DD';

export const getDateFromString = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export const formatDate = (date: Date): string => {
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
    const formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(date);
    const formattedTime = new Intl.DateTimeFormat("en-GB", timeOptions).format(date);
    return `${formattedDate}, ${formattedTime}`;
}

export const datesMatch = (date1: Date, date2: Date): boolean => {
    return getDateFromString(date1) === getDateFromString(date2);
};

export const getDateTimeRange = (startDate: Date, endDate: Date, dates: Date[], markedDates: MarkedDate[] = []): MarkedDate[] => {
    if(datesMatch(startDate, endDate)) return markedDates;
    const dateExists = dates.some(date => datesMatch(date, startDate));
    if(dateExists) {
        const startDateObj = new Date(startDate);
        startDateObj.setDate(startDateObj.getDate() + 1);
        const editedMarkedDates = [
            ...markedDates,
            {
                date: getDateFromString(startDate),
                disabled: false
            }
        ];
        return getDateTimeRange(startDateObj, endDate, dates, editedMarkedDates);
    };
    const startDateObj = new Date(startDate);
    const editedMarkedDates = [
        ...markedDates,
        {
            date: getDateFromString(startDate),
            disabled: true
        }
    ]
    startDateObj.setDate(startDateObj.getDate() + 1);
    return getDateTimeRange(startDateObj, endDate, dates, editedMarkedDates);
};

export const createDateTimeline = (availableAppointmentSlots: MarkedAppointmentSlot[]): MarkedDate[] => {
    const startDate = new Date();
    const endSlot = availableAppointmentSlots.at(-1);
    const dates = availableAppointmentSlots.map(availableAppointmentSlot => new Date(availableAppointmentSlot.date));
    return getDateTimeRange(startDate, new Date(endSlot.date), dates);
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

const getFutureDateByTimeOptions = (params: TimeOptions, startDate: Date | null): Date => {
    const editedDate = startDate ?? new Date();
    if(params.year) editedDate.setFullYear(editedDate.getFullYear() + params.year);
    if(params.month) editedDate.setMonth(editedDate.getMonth() + params.month);
    if(params.day) editedDate.setDate(editedDate.getDate() + params.day);
    return editedDate;
};

export const getFutureDate = (params: TimeOptions, startDate: Date = null): Date => {
    return getFutureDateByTimeOptions(params, startDate);
};