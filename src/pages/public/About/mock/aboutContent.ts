import type { CompanyValue } from '../types/about.type';

export const ABOUT_PARAGRAPHS: readonly string[] = [
  'We build tools that help teams ship reliable software without reinventing the basics.',
  'This starter captures the conventions we use in production: strict typing, clear module boundaries, accessible components and a predictable folder structure.',
];

export const COMPANY_VALUES: readonly CompanyValue[] = [
  { title: 'Clarity', description: 'Code that reads like documentation.' },
  {
    title: 'Accessibility',
    description: 'Every interaction works with a keyboard and screen reader.',
  },
  { title: 'Ownership', description: 'Small, focused modules that are easy to change.' },
];
