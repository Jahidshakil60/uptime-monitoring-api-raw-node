// 
// Title: Environments 
// Description: Handle all environment related things 
// Author: Jahid Hasan Shakil
// Date: 05/03/2023
// 

// module scaffolding
const environments = {};

environments.staging = {
    port: 8000,
    envName: 'staging',
    secretKey: 'hsjhsgatghjj',
    twilio: {
        fromPhone: '+15005550006',
        accountSid: 'AC9bdeb7f61af0e98d5c00049beb42005c',
        authToken: 'c98b490f0f4cf8403e9e6fb785b34b84'
    }
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'hsjhsghgfhgfjdh',
    twilio: {
        fromPhone: '+15005550006',
        accountSid: 'AC9bdeb7f61af0e98d5c00049beb42005c',
        authToken: 'c98b490f0f4cf8403e9e6fb785b34b84'
    }

}

// determine which environment was passed
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment Object
const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;
