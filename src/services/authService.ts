import {
  DEFAULT_SIGNUP_ROLE,
  DEMO_ACCOUNTS,
  DEMO_PASSWORD,
  MOCK_LATENCY_MS,
  STORAGE_KEYS,
  USER_ROLES,
} from '@/config/constants';
import type { LoginCredentials, ProfileUpdate, SignupPayload, User, UserRole } from '@/types';
import { delay, readStorage, removeStorage, writeStorage } from '@/utils';

function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.email === 'string' &&
    USER_ROLES.some((role) => role === candidate.role)
  );
}

function createUser(name: string, email: string, role: UserRole): User {
  return { id: crypto.randomUUID(), name, email: email.trim().toLowerCase(), role };
}

/** Mocked auth API. Swap the bodies for `apiRequest` calls when a backend exists. */
export const authService = {
  getStoredUser(): User | null {
    return readStorage(STORAGE_KEYS.AUTH_USER, isUser);
  },

  persistUser(user: User): void {
    writeStorage(STORAGE_KEYS.AUTH_USER, user);
  },

  clearSession(): void {
    removeStorage(STORAGE_KEYS.AUTH_USER);
  },

  async login({ email, password }: LoginCredentials): Promise<User> {
    await delay(MOCK_LATENCY_MS);
    const normalizedEmail = email.trim().toLowerCase();
    const account = DEMO_ACCOUNTS.find((demo) => demo.email === normalizedEmail);
    if (!account || password !== DEMO_PASSWORD) throw new Error('Invalid email or password.');
    return createUser(account.name, account.email, account.role);
  },

  async signup({ name, email }: SignupPayload): Promise<User> {
    await delay(MOCK_LATENCY_MS);
    return createUser(name.trim(), email, DEFAULT_SIGNUP_ROLE);
  },

  async updateProfile(user: User, update: ProfileUpdate): Promise<User> {
    await delay(MOCK_LATENCY_MS);
    return { ...user, name: update.name.trim(), email: update.email.trim().toLowerCase() };
  },
};
