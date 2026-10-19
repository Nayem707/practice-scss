import { Atom, Braces, Layers, Lock, Palette, Zap } from 'lucide-react';
import { APP_CONFIG } from '@/config/app';
import { ROUTES } from '@/routes/constants/paths';
import type { Feature, HeroContent } from '../types/home.type';

export const HERO_CONTENT: HeroContent = {
  eyebrow: 'Now with role-based dashboards',
  titleLines: ['Ship polished', 'products,', 'faster.'],
  lead: APP_CONFIG.description,
  primaryCta: { label: 'Get started', to: ROUTES.AUTH.SIGNUP },
  secondaryCta: { label: 'Learn more', to: ROUTES.PUBLIC.ABOUT },
  stackLabel: 'Built with',
  techs: [
    { label: 'React 19', icon: Atom },
    { label: 'TypeScript', icon: Braces },
    { label: 'Vite', icon: Zap },
    { label: 'SCSS', icon: Palette },
  ],
};

export const HOME_FEATURES: readonly Feature[] = [
  {
    title: 'Layout-based routing',
    description: 'Public, auth and admin shells with nested routes and code splitting.',
    icon: Layers,
  },
  {
    title: 'Protected routes',
    description: 'Context-driven auth guard with redirect-back after login.',
    icon: Lock,
  },
  {
    title: 'Themeable design system',
    description: 'SCSS tokens, CSS custom properties and a light/dark theme.',
    icon: Palette,
  },
  {
    title: 'Fast by default',
    description: 'Vite, React 19 and lazy-loaded pages keep bundles small.',
    icon: Zap,
  },
];
