const APP_NAME = 'RPF';
const FUTURE_DATE = '2023-07-30';

interface Config {
    apiKey: string;
    url: string;
    appointmentsServiceId: string;
};

const TEST_CONFIG: Config = {
    apiKey: '5bdf48784c057dceaa9e63173d7cbc91edbcdade',
    url: 'https://rpf.test.makeplans.net/api/v1',
    appointmentsServiceId: '2079'
};
const PROD_CONFIG: Config = {
    apiKey: 'd29209e1dfa420e909770066f70e59b25b5c851b',
    url: 'https://rpf.makeplans.com/api/v1',
    appointmentsServiceId: '24442'
};
const CONFIG = TEST_CONFIG;


interface AppointmentSlotParams {
    to?: string;
};

interface BookingParams {
    start?: string;
    end?: string;
};

interface AppointmentSlot {
    timestamp: string;
    timestamp_end: string;
    formatted_timestamp: string;
    formatted_timestamp_end: string;
    free: number;
    available_resources: number[];
    maximum_capacity: number;
}

interface GetAppointmentsResponse {
    slot: AppointmentSlot;
};

interface MarkedAppointmentSlot extends AppointmentSlot {
    available: boolean;
};

interface GetActiveBookingsResponse {
    booking: {
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
};

interface ErrorResponse {
    error: {
        description: string;
    }
};

interface GetFutureDataParams {
    year: number;
    month: number;
    date: number
};

const combineParams = <Params>(params: Params[]): string => {
    return params.reduce<string>((accParams, currParams) => {
        const strParam = Object.entries(currParams).reduce((acp, p) => `${acp}${p[0]}=${p[1]}`, '');
        return `${accParams}${strParam}`;
    }, '');
};

// const getFutureDate = (dateObj: GetFutureDataParams): string => {
//
// }

const datesMatch = (date1: string, date2: string): boolean => {
    return new Date(date1).getTime() === new Date(date2).getTime()
}

const getAppointmentSlots = async <Params>(params: Params[]): Promise<GetAppointmentsResponse[] | ErrorResponse> => {
    const response = await fetch(`${CONFIG.url}/services/${CONFIG.appointmentsServiceId}/slots?${combineParams<Params>(params)}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${CONFIG.apiKey}`,
            'User-Agent': `${APP_NAME}`
        },
    });
    return response.json();
};

const getActiveBookings = async<Params>(params: Params[]): Promise<GetActiveBookingsResponse[] | ErrorResponse> => {
    const response = await fetch(`${CONFIG.url}/bookings/upcoming?${combineParams<Params>(params)}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${CONFIG.apiKey}`,
            'User-Agent': `${APP_NAME}`
        },
    });
    return response.json();
}

// const bookAppointment = (data: any) => {
//     return fetch(API_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${API_KEY}`,
//             'User-Agent': APP_NAME
//         },
//         body: JSON.stringify(data)
//     })
// };

// getAppointmentSlots<AppointmentSlotParams>([
//     {to: FUTURE_DATE}
// ]).then(console.log)
//
// getActiveBookings<BookingParams>([
//     {end: FUTURE_DATE}
// ]).then(console.log)

const getAvailableAppointmentSlots = async(): Promise<MarkedAppointmentSlot[]> => {
    const results = await Promise.all([
        getAppointmentSlots<AppointmentSlotParams>([
            {to: FUTURE_DATE}
        ]),
        getActiveBookings<BookingParams>([
            {end: FUTURE_DATE}
        ])
    ]);
    const [appointments, activeBookings] = results;
    if('error' in appointments) return [];
    return appointments.map(appointment => {
        if('error' in activeBookings) return {
            ...appointment.slot,
            available: true
        };
        return ({
            ...appointment.slot,
            available: !activeBookings.some(
                activeBooking => datesMatch(activeBooking.booking.booked_from, appointment.slot.timestamp)
            )
        })
    });
};

getAvailableAppointmentSlots().then(console.log);
