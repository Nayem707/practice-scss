const DEFAULT_APP_NAME = 'Acme';
const DEFAULT_API_BASE_URL = '/api';

/** Typed, defaulted access to Vite environment variables. */
export const ENV = {
  appName: import.meta.env.VITE_APP_NAME ?? DEFAULT_APP_NAME,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
