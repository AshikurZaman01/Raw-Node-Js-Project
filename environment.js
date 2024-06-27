


const environment = {}

environment.stagging = {
    port: 3000,
    envName: 'stagging',
}

environment.production = {
    port: 5000,
    envName: 'production',
}

const currentEnv = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : 'stagging';

const envToExport = typeof (environment[currentEnv]) === 'object' ? environment[currentEnv] : environment.stagging;

module.exports = envToExport;