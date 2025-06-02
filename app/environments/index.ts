/* eslint-disable no-console */
import { API_URL, ENVIRONMENT, ACCESS_KEY } from './env.development';

console.log('ENVIRONMENT', ENVIRONMENT);

console.log('API URL', API_URL);


export default {
  environment: ENVIRONMENT,

  debug: ENVIRONMENT === require('./env.development').ENVIRONMENT,

  url: {
    key: ACCESS_KEY,
    api: API_URL,
  } as const,
} as const;