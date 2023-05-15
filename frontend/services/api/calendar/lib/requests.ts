import {CONFIG} from "../config";
import {ErrorResponse} from "../api/types";

const combineParams = (params: {}): string => {
    return Object.keys(params).reduce((allParams, currParamsKey) => {
        return allParams.length
            ? `${allParams}&${currParamsKey}=${params[currParamsKey]}`
            : `${currParamsKey}=${params[currParamsKey]}`;
    }, '');
};

export const requests = {
    async get<Response>(url: string, params: {}): Promise<Response | ErrorResponse> {
        const response = await fetch(`${url}?${combineParams(params)}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${CONFIG.apiKey}`,
                'User-Agent': `${CONFIG.APP_NAME}`
            },
        });
        return response.json();
    },
    async post<Response, DataType>(url: string, data: DataType): Promise<Response | ErrorResponse> {
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