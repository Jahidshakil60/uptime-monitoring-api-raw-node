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
    secretKey: 'hsjhsgatghjj'
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'hsjhsghgfhgfjdh'

}

// determine which environment was passed
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment Object
const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;
