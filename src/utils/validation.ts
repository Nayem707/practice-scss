import { MESSAGE_MIN_LENGTH, NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from '@/config/constants';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Each validator returns an error message, or undefined when the value is valid. */
export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return 'Email is required.';
  if (!EMAIL_PATTERN.test(value.trim())) return 'Enter a valid email address.';
  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) return 'Password is required.';
  if (value.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  }
  return undefined;
}

export function validateName(value: string): string | undefined {
  if (value.trim().length < NAME_MIN_LENGTH) {
    return `Name must be at least ${NAME_MIN_LENGTH} characters.`;
  }
  return undefined;
}

export function validateMessage(value: string): string | undefined {
  if (value.trim().length < MESSAGE_MIN_LENGTH) {
    return `Message must be at least ${MESSAGE_MIN_LENGTH} characters.`;
  }
  return undefined;
}

/** True when an errors object contains no messages. */
export function isValid<T extends object>(errors: T): boolean {
  return Object.values(errors).every((message) => message === undefined);
}
