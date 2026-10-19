import { useCallback, useEffect, useState } from 'react';
import type { AsyncState } from '@/types';
import { toError } from '@/utils';

interface UseAsyncResult<TData> {
  state: AsyncState<TData>;
  retry: () => void;
}

/**
 * Runs `fetcher` on mount (and on `retry`), aborting stale requests.
 * `fetcher` must be referentially stable (module-level or memoized).
 */
export function useAsync<TData>(
  fetcher: (signal: AbortSignal) => Promise<TData>,
): UseAsyncResult<TData> {
  const [state, setState] = useState<AsyncState<TData>>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetcher(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setState({ status: 'success', data });
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) setState({ status: 'error', error: toError(error) });
      });

    return () => controller.abort();
  }, [fetcher, attempt]);

  const retry = useCallback(() => {
    setState({ status: 'loading' });
    setAttempt((current) => current + 1);
  }, []);

  return { state, retry };
}
