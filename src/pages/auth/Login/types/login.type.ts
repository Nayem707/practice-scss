import type { useLoginForm } from '../hooks/useLoginForm';

export interface LoginHeaderContent {
  title: string;
  subtitle: string;
}

export interface LoginFormContent {
  submitLabel: string;
}

export interface LoginFooterContent {
  prompt: string;
  linkLabel: string;
}

/** Shared by the demo-accounts and form sections so both drive the same form state. */
export type LoginFormState = ReturnType<typeof useLoginForm>;
