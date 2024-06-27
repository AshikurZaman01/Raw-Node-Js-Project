
const environemnts = {}

environemnts.staging = {
    port: 3000,
    envName: 'staging',
}


environemnts.production = {
    port: 5000,
    envName: 'production',
}


const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : 'staging'