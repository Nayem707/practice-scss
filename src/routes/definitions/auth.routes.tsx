import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { ROUTES } from '../constants/paths';
import { GuestRoute } from '../guards/GuestRoute';
import { renderLazyLayout } from '../utils/renderLazy';

const AuthLayout = lazy(() => import('@/layouts/AuthLayout'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Signup = lazy(() => import('@/pages/auth/Signup'));

/** Login and sign-up: guests only, rendered inside AuthLayout. */
export const authRoutes: RouteObject = {
  path: ROUTES.AUTH.ROOT,
  element: <GuestRoute>{renderLazyLayout(AuthLayout)}</GuestRoute>,
  children: [
    { index: true, element: <Navigate to={ROUTES.AUTH.LOGIN} replace /> },
    { path: ROUTES.AUTH.LOGIN, element: <Login /> },
    { path: ROUTES.AUTH.SIGNUP, element: <Signup /> },
  ],
};
