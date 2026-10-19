import { ROUTES } from '@/routes/constants/paths';
import type { NavLinkItem } from '@/types';

export const PUBLIC_NAV_LINKS: readonly NavLinkItem[] = [
  { label: 'Home', to: ROUTES.PUBLIC.HOME },
  { label: 'About', to: ROUTES.PUBLIC.ABOUT },
  { label: 'Contact', to: ROUTES.PUBLIC.CONTACT },
];

export const FOOTER_LINKS: readonly NavLinkItem[] = [
  ...PUBLIC_NAV_LINKS,
  { label: 'Sign in', to: ROUTES.AUTH.LOGIN },
];
