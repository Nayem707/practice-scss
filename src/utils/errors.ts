const FALLBACK_ERROR_MESSAGE = 'Something went wrong. Please try again.';

/** Normalizes any thrown value into an Error instance. */
export function toError(value: unknown): Error {
  if (value instanceof Error) return value;
  if (typeof value === 'string') return new Error(value);
  return new Error(FALLBACK_ERROR_MESSAGE);
}

export function getErrorMessage(value: unknown): string {
  return toError(value).message || FALLBACK_ERROR_MESSAGE;
}
