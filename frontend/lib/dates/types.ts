export interface MarkedDate {
    date: string;
    disabled: boolean;
}

export interface TimeOptions {
    year?: number;
    month?: number;
    day?: number
};

export type DateMethod = (date: Date, time: number) => Date;

export interface GetFutureDataParamsMethods {
    year: DateMethod;
    month: DateMethod;
    day: DateMethod
};

