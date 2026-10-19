import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ROUTES } from '../constants/paths';
import { renderLazyLayout } from '../utils/renderLazy';

const PublicLayout = lazy(() => import('@/layouts/PublicLayout'));
const Home = lazy(() => import('@/pages/public/Home'));
const About = lazy(() => import('@/pages/public/About'));
const Contact = lazy(() => import('@/pages/public/Contact'));

/** Marketing pages: open to everyone, rendered inside PublicLayout. */
export const publicRoutes: RouteObject = {
  path: ROUTES.PUBLIC.HOME,
  element: renderLazyLayout(PublicLayout),
  children: [
    { index: true, element: <Home /> },
    { path: ROUTES.PUBLIC.ABOUT, element: <About /> },
    { path: ROUTES.PUBLIC.CONTACT, element: <Contact /> },
  ],
};
