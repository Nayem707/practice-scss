export type Size = 'sm' | 'md' | 'lg';

/** Discriminated union describing the lifecycle of an async request. */
export type AsyncState<TData> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: TData }
  | { status: 'error'; error: Error };

/** Field-level validation messages keyed by form field. */
export type FormErrors<TValues> = Partial<Record<keyof TValues, string>>;
