const APP_NAME = 'RPF';
const FUTURE_DATE = '2023-07-01';

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
export const CONFIG = {
    ...TEST_CONFIG,
    APP_NAME,
    FUTURE_DATE
};