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

// const getFutureDate = (dateObj: GetFutureDataParams): string => {
//
// };