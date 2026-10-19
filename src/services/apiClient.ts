import { ENV } from '@/config/env';

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

/**
 * Minimal JSON fetch wrapper. Real services should call this; the mocked
 * services in this folder bypass it until a backend exists.
 */
export async function apiRequest<TResponse>(
  path: string,
  { method = 'GET', body, signal, headers }: RequestOptions = {},
): Promise<TResponse> {
  const response = await fetch(`${ENV.apiBaseUrl}${path}`, {
    method,
    signal,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    throw new ApiError(response.statusText || 'Request failed', response.status);
  }

  return (await response.json()) as TResponse;
}
