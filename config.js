'use strict';

/*
 * Create and exports configuration variables
 *
 */
 
//Configuration for all environtment

const environments = {};

//Staging (default) environment

environments.staging = {
  'port' : 3000,
  'envName' : 'staging',
};

environments.production = {
  'port' : 5000,
  'envName' : 'production',
};

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

const environmentToExports = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExports;