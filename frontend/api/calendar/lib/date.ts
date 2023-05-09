import {MarkedAppointmentSlot, MarkedDate} from "../types";

export const getDate = (date: string): string => {
    return new Date(date).toISOString().split('T')[0];
};

export const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(date));
}

export const datesMatch = (date1: string, date2: string): boolean => {
    return new Date(getDate(date1)).getTime() === new Date(getDate(date2)).getTime()
};

export const getFutureDates = () => {

}

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
}

export const createDateTimeline = (availableAppointmentSlots: MarkedAppointmentSlot[]): MarkedDate[] => {
    const startDate = getDate(new Date().toISOString());
    const endDate = availableAppointmentSlots.at(-1);
    const dates = availableAppointmentSlots.map(availableAppointmentSlot => availableAppointmentSlot.title);
    return getDateTimeRange(startDate, endDate.title, dates);
}


// const getFutureDate = (dateObj: GetFutureDataParams): string => {
//
// };