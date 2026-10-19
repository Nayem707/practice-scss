import type { UserRole } from '@/types';

/** Keep in sync with $breakpoints in src/styles/_variables.scss. */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;

export const MEDIA_QUERIES = {
  DESKTOP: `(min-width: ${BREAKPOINTS.LG}px)`,
  PREFERS_DARK: '(prefers-color-scheme: dark)',
} as const;

export const STORAGE_KEYS = {
  AUTH_USER: 'acme.auth.user',
  THEME: 'acme.theme',
} as const;

export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVICE_UNAVAILABLE: 503,
} as const;

/** Simulated network latency for mocked services. */
export const MOCK_LATENCY_MS = 600;

export const PASSWORD_MIN_LENGTH = 8;
export const NAME_MIN_LENGTH = 2;
export const MESSAGE_MIN_LENGTH = 10;

export const USER_ROLES: readonly UserRole[] = ['admin', 'seller', 'maintainer'];

export const ROLE_LABELS: Readonly<Record<UserRole, string>> = {
  admin: 'Admin',
  seller: 'Seller',
  maintainer: 'Maintainer',
};

/** Role assigned to self-service sign-ups. */
export const DEFAULT_SIGNUP_ROLE: UserRole = 'seller';

export interface DemoAccount {
  name: string;
  email: string;
  role: UserRole;
}

export const DEMO_PASSWORD = 'password123';

export const DEMO_ACCOUNTS: readonly DemoAccount[] = [
  { name: 'Ada Admin', email: 'admin@acme.dev', role: 'admin' },
  { name: 'Sam Seller', email: 'seller@acme.dev', role: 'seller' },
  { name: 'Max Maintainer', email: 'maintainer@acme.dev', role: 'maintainer' },
];
