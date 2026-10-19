import { ENV } from './env';

export const APP_CONFIG = {
  name: ENV.appName,
  tagline: 'Ship polished products, faster.',
  description: 'A production-grade React + TypeScript starter with layouts, auth and routing.',
  supportEmail: 'support@acme.dev',
  copyrightHolder: `${ENV.appName} Inc.`,
} as const;
