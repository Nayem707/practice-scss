import { ENV } from '@/config/env';

/**
 * Central error reporting hook. Wire a monitoring service (Sentry, Datadog…)
 * here; in development errors are surfaced in the console.
 */
export function reportError(error: unknown, context?: Record<string, unknown>): void {
  if (ENV.isDev) console.error('[reportError]', error, context);
}
