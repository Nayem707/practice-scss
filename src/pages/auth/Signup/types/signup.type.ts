import type { SignupPayload } from '@/types';

export interface SignupFormValues extends SignupPayload {
  confirmPassword: string;
}

export interface SignupHeaderContent {
  title: string;
  subtitle: string;
}

export interface SignupFormContent {
  submitLabel: string;
}

export interface SignupFooterContent {
  prompt: string;
  linkLabel: string;
}
