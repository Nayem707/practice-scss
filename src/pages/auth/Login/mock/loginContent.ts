import type { LoginFooterContent, LoginFormContent, LoginHeaderContent } from '../types/login.type';

export const LOGIN_HEADER: LoginHeaderContent = {
  title: 'Welcome back',
  subtitle: 'Log in to access your dashboard.',
};

export const LOGIN_FORM: LoginFormContent = {
  submitLabel: 'Log in',
};

export const LOGIN_FOOTER: LoginFooterContent = {
  prompt: "Don't have an account?",
  linkLabel: 'Sign up',
};
