const APP_NAME = 'RPF';

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

const config = TEST_CONFIG;

export const CONFIG = {
    ...config,
    APP_NAME,
};