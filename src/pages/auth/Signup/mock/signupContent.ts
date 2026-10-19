import type {
  SignupFooterContent,
  SignupFormContent,
  SignupHeaderContent,
} from '../types/signup.type';

export const SIGNUP_HEADER: SignupHeaderContent = {
  title: 'Create your account',
  subtitle: 'It only takes a minute.',
};

export const SIGNUP_FORM: SignupFormContent = {
  submitLabel: 'Create account',
};

export const SIGNUP_FOOTER: SignupFooterContent = {
  prompt: 'Already have an account?',
  linkLabel: 'Log in',
};
