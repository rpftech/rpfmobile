import {CONFIG} from "../config";

import {ErrorResponse, PostBookingRequest} from "../types";

const combineParams = <Params>(params: Params[]): string => {
    return params.reduce<string>((accParams, currParams) => {
        const strParam = Object.entries(currParams).reduce((acp, p) => `${acp}${p[0]}=${p[1]}`, '');
        return `${accParams}${strParam}`;
    }, '');
};

export const requests = {
    async get<Params, Response>(url: string, params: Params[]): Promise<Response | ErrorResponse> {
        const response = await fetch(`${url}?${combineParams<Params>(params)}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${CONFIG.apiKey}`,
                'User-Agent': `${CONFIG.APP_NAME}`
            },
        });
        return response.json();
    },
    async post<Response>(url: string, data: PostBookingRequest): Promise<Response | ErrorResponse> {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${CONFIG.apiKey}`,
                'User-Agent': `${CONFIG.APP_NAME}`
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
}