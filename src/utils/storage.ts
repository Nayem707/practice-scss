/**
 * Thin wrappers around localStorage that never throw (private mode, quota, SSR)
 * and validate parsed data with a caller-supplied type guard.
 */
export function readStorage<T>(key: string, isValid: (value: unknown) => value is T): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return null;
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable — state simply won't persist across reloads.
  }
}

export function removeStorage(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage unavailable — nothing to remove.
  }
}
