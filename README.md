# Acme — React + TypeScript starter

A production-grade Vite + React 19 + TypeScript scaffold with three layout groups (public, auth, role-based dashboard), mocked authentication, a themeable SCSS design system and route-level code splitting.

## Setup

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env.local   # optional — defaults are built in
npm run dev                   # http://localhost:5173
```

Demo logins (password `password123` for all; the login page has "Fill in" shortcuts):

| Role       | Email                 | Lands on           |
| ---------- | --------------------- | ------------------ |
| Admin      | `admin@acme.dev`      | `/dash/admin`      |
| Seller     | `seller@acme.dev`     | `/dash/seller`     |
| Maintainer | `maintainer@acme.dev` | `/dash/maintainer` |

Sign-up accepts any valid details, creates a **seller**, and logs you in immediately.

## Scripts

| Script                 | Purpose                                       |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Start the Vite dev server with HMR            |
| `npm run build`        | Type-check (`tsc -b`) and build to `dist/`    |
| `npm run preview`      | Serve the production build locally            |
| `npm run typecheck`    | Type-check only                               |
| `npm run lint`         | ESLint (flat config in `eslint.config.js`)    |
| `npm run lint:fix`     | ESLint with auto-fix                          |
| `npm run format`       | Prettier write (config in `.prettierrc.json`) |
| `npm run format:check` | Prettier check (for CI)                       |

## Folder structure

```
src/
├── assets/                 # Images, icons, fonts
├── components/
│   ├── ui/                 # Presentational, reusable: Alert, Badge, Button, ButtonLink,
│   │                       # Card, FormField, Input, Loader, Modal, Textarea
│   ├── layout/             # Layout chrome: Navbar, Footer, Sidebar, Topbar, Breadcrumbs, UserMenu
│   └── common/             # App-level: ErrorBoundary, ErrorState, Logo,
│                           # PageHeader, PageLoader, SkipLink, ThemeToggle
├── config/
│   ├── constants.ts        # USER_ROLES, ROLE_LABELS, DEMO_ACCOUNTS, storage keys, breakpoints…
│   ├── dash-nav.config.ts  # Sidebar items per role + dashboard breadcrumb labels
│   ├── dash-stats.config.ts # Which stats each role's home page shows
│   └── env.ts, app.ts, navigation.ts (public navbar/footer links)
├── contexts/               # AuthContext + AuthProvider, ThemeContext + ThemeProvider
├── hooks/                  # useAuth, useRole, useTheme, useMediaQuery, useToggle, useForm, useAsync,
│                           # useFocusTrap, useEscapeKey, useClickOutside, useBodyScrollLock, useDocumentTitle
├── layouts/                # PublicLayout, AuthLayout, DashLayout (shared by every role)
├── pages/
│   ├── public/             # Home, About, Contact
│   ├── auth/               # Login, Signup
│   ├── dash/
│   │   ├── admin/          # home/AdminHomePage, settings/AdminSettingsPage
│   │   ├── seller/         # home/SellerHomePage, settings/SellerSettingsPage
│   │   ├── maintainer/     # home/MaintainerHomePage, settings/MaintainerSettingsPage
│   │   └── shared/         # DashHomePageShell, DashSettingsShell, StatsCard,
│   │                       # components/ (ActivityList, Profile/Appearance/AccountSection)
│   └── error/              # NotFound, Forbidden, ServerError, Maintenance
│                           # (share components/ErrorPageTemplate)
├── routes/
│   ├── router.tsx          # createBrowserRouter(routes), nothing else
│   ├── index.ts            # Public barrel
│   ├── constants/paths.ts  # ROUTES, DASH_ROUTES (per role), REDIRECT_PARAM
│   ├── definitions/        # The route tree, one file per layout group:
│   │                       # public / auth / dash / error .routes.tsx, combined in index.tsx
│   ├── guards/             # ProtectedRoute (auth), RoleProtectedRoute (403 for other roles),
│   │                       # GuestRoute (keeps signed-in users out of /auth/*)
│   ├── components/         # RouteErrorBoundary (HTTP status → error page),
│   │                       # DashIndexRedirect (/dash → the user's own role home)
│   └── utils/              # access.ts (canRoleAccessPath, getPostAuthRedirect),
│                           # renderLazy.tsx (Suspense wrapper for lazy layouts)
├── services/               # apiClient + mocked auth/dashboard/contact services
├── styles/                 # _variables, _mixins, _reset, _theme, _typography, _utilities, globals.scss
├── types/                  # Shared TypeScript types
├── utils/                  # Pure helpers (cn, validation, format, storage, redirect…)
├── App.tsx                 # Providers + RouterProvider inside the app ErrorBoundary
└── main.tsx                # Entry point
```

**Conventions**

- Every component lives in its own folder: `ComponentName.tsx`, `ComponentName.module.scss`, `index.ts`.
- Named exports everywhere, except pages and layouts, which default-export for `React.lazy`.
- Components used by a single page live under that page's `components/` folder.
- Import via the `@/` alias (maps to `src/`), configured in `vite.config.ts` and `tsconfig.app.json`.

## Routing strategy

Routes are declared per layout group in `src/routes/definitions/` (`public`, `auth`, `dash`, `error`.routes.tsx). `definitions/index.tsx` combines them under one shared error boundary, and `src/routes/router.tsx` passes the result to `createBrowserRouter`. Every path comes from `ROUTES` / `DASH_ROUTES` in `src/routes/constants/paths.ts`, so path strings are never hardcoded.

| Path                                            | Layout       | Guard                                       |
| ----------------------------------------------- | ------------ | ------------------------------------------- |
| `/`, `/about`, `/contact`                       | PublicLayout | —                                           |
| `/auth/login`, `/auth/signup`                   | AuthLayout   | `GuestRoute`                                |
| `/dash`                                         | DashLayout   | `ProtectedRoute`                            |
| `/dash/admin`, `/dash/admin/settings`           | DashLayout   | `RoleProtectedRoute allow={['admin']}`      |
| `/dash/seller`, `/dash/seller/settings`         | DashLayout   | `RoleProtectedRoute allow={['seller']}`     |
| `/dash/maintainer`, `/dash/maintainer/settings` | DashLayout   | `RoleProtectedRoute allow={['maintainer']}` |
| `/forbidden`                                    | —            | —                                           |
| `/server-error`                                 | —            | —                                           |
| `/maintenance`                                  | —            | —                                           |
| `*` (404)                                       | —            | —                                           |

- **Code splitting:** layouts and pages are loaded with `React.lazy`, except the error pages (see below). Lazy layouts use a full-screen Suspense fallback (`renderLazyLayout`). Each layout wraps its own `<Outlet />` in `Suspense`, so the navbar or sidebar stays visible while a page chunk loads.
- **Auth guard:** `ProtectedRoute` sends unauthenticated users to `/auth/login?redirect=<original path>`. After login or sign-up, users go to that `redirect` value, or to `/dash` (their own role home) if there isn't one. `getSafeRedirect` only accepts same-origin relative paths, which prevents open redirects. `getPostAuthRedirect` also ignores a `redirect` into another role's dashboard (for example one left over from the previous user's logout), so users land on their own dashboard instead of a 403.
- **Guest guard:** `GuestRoute` sends authenticated users away from `/auth/*`.
- **Index redirects:** `/auth` redirects to `/auth/login`, and `/dash` redirects to the signed-in user's role home (`DASH_ROUTES[role].HOME`).
- **Role guard:** `RoleProtectedRoute allow={[...]}` sends guests to login and signed-in users with any other role to `/forbidden`. With no children it renders `<Outlet />`, so it can be a layout route's `element`.
- **Errors:** see [Error pages](#error-pages).

## Role dashboards

Every role shares `DashLayout` (sidebar, topbar, breadcrumbs). What changes per role is driven by config, not by separate layouts:

| What                       | Where                                                      |
| -------------------------- | ---------------------------------------------------------- |
| Paths                      | `DASH_ROUTES[role]` in `routes/constants/paths.ts`         |
| Sidebar items              | `DASH_NAV_CONFIG[role]` in `config/dash-nav.config.ts`     |
| Home page stats and labels | `DASH_STATS_CONFIG[role]` in `config/dash-stats.config.ts` |
| Accent colour              | `--dash-accent` in the page's `.module.scss`               |

Role pages are thin: they render `DashHomePageShell` or `DashSettingsShell` with their `role`, a description and a `className` that sets `--dash-accent`. Pass `children` to either shell to add role-specific sections. Use `useRole()` in components that need the current user's role.

**Adding a role** (for example `support`):

1. Add it to `UserRole` (`types/auth.ts`), `USER_ROLES` and `ROLE_LABELS` (`config/constants.ts`).
2. Add `DASH_ROUTES.support`, `DASH_NAV_CONFIG.support` and `DASH_STATS_CONFIG.support`. TypeScript reports each record that's missing the new key.
3. Create `pages/dash/support/{home,settings}/` and add both pages to `DASH_PAGES` in `routes/definitions/dash.routes.tsx`. The route group is generated from `USER_ROLES`.

**Adding a page to a role:** add its path to `DASH_ROUTES[role]`, register it in `createDashRoleRoute`, and add a sidebar item to `DASH_NAV_CONFIG[role]`.

## Error pages

All error pages live in `src/pages/error/`. They render full-screen with no layout chrome and share `components/ErrorPageTemplate`, which provides the icon, the large status code, the title, the message, optional technical details, and the action buttons. Each page sets only its accent colour (`--error-accent`) and its own actions.

| Page          | Code | Route           | Shown when                                                        |
| ------------- | ---- | --------------- | ----------------------------------------------------------------- |
| `NotFound`    | 404  | `*`             | No route matches, or a loader throws a 404 response               |
| `Forbidden`   | 403  | `/forbidden`    | `RoleProtectedRoute` check fails, or a 401/403 response           |
| `ServerError` | 500  | `/server-error` | Any uncaught render or loader error, including failed chunk loads |
| `Maintenance` | 503  | `/maintenance`  | A 503 response, or you redirect there during planned downtime     |

- **`RouteErrorBoundary`** (`src/routes/components/`) is the router's `errorElement`. It shows the error page that matches the HTTP status of a thrown `Response`, for example `throw new Response(null, { status: 403 })` in a loader. Any other error shows `ServerError`, with the error message included in development builds only. Errors are reported through `reportError`.
- **Eager imports:** error pages are not lazy-loaded. If a lazy chunk fails to load (a network drop or a new deploy), the error page itself must still be available.
- The app-level **`ErrorBoundary`** in `App.tsx` remains the last-resort fallback for errors thrown outside the router.
- **Adding a page:** create `src/pages/error/<Name>/` with `<Name>.tsx`, `<Name>.module.scss` (which sets `--error-accent`), and `index.ts`. Render `ErrorPageTemplate`, add a path under `ROUTES.ERROR`, and register the route. If it corresponds to an HTTP status, also add it to `RouteErrorBoundary`.

## Auth (mocked)

`AuthProvider` exposes `{ user, isAuthenticated, login, signup, updateProfile, logout }` through `useAuth()`. The session is saved to `localStorage`, validated with a type guard when read back, and kept in sync across browser tabs. To connect a real backend, replace the bodies of the methods in `src/services/authService.ts` with `apiRequest` calls. The context API stays the same.

## Styling conventions

Component styles use **SCSS Modules** (`*.module.scss`). Global tokens, mixins, and base styles live in `src/styles/`. Tailwind and inline styles are not used.

```
src/styles/
  _variables.scss    # Token maps (colors, spacing, typography, radii, motion) + breakpoints, z-index, sizes
  _mixins.scss       # respond-to(), flex helpers, container, focus-ring, visually-hidden, z()
  _reset.scss        # CSS reset
  _theme.scss        # Emits token maps as CSS custom properties on :root / [data-theme]
  _typography.scss   # Body text, headings, links, code
  _utilities.scss    # Global helpers (.visually-hidden, .is-scroll-locked)
  globals.scss       # Entry point; imports the partials (imported once in main.tsx)
```

- **Automatic imports:** `_variables.scss` and `_mixins.scss` are added to every SCSS file by `css.preprocessorOptions.scss.additionalData` in `vite.config.ts`, so modules never need to `@use` them. Neither file may output CSS.
- **CSS custom properties for themeable tokens.** Colors, spacing, radii, font families, sizes, weights, line heights, and transitions are declared as maps in `_variables.scss`. `_theme.scss` turns them into `--color-*`, `--space-*`, `--radius-*`, `--font-size-*` and so on. Modules use `var(--space-4)`, never raw values. Values needed at compile time stay as SCSS variables: breakpoints (media queries can't read custom properties), z-index through `z(modal)`, and fixed sizes such as `$control-height-md` or `$sidebar-width`.
- **Theming:** `ThemeProvider` sets `data-theme="light|dark"` on `<html>`, which switches the color palette. The choice is saved to `localStorage`, and on first visit it follows the OS preference.
- **Mobile-first:** base styles target small screens, and larger screens are layered on with `@include respond-to(md) { … }`, which compiles to `min-width`. An unknown breakpoint name fails the build.
- **BEM-ish class names** inside modules, using `block__element--modifier`. The block is the component name in camelCase. Elements are camelCase. Modifiers are kebab-case:

  ```scss
  .navbar {
    &__link {
      &--active { … }
    }
  }
  ```

  ```tsx
  <NavLink className={cn(styles.navbar__link, isActive && styles['navbar__link--active'])} />
  ```

  Class names are exported exactly as written (no `localsConvention`), so the names in TSX match the SCSS exactly. Use bracket access only for modifiers.

- **No magic numbers:** use tokens (`var(--space-4)`, `$control-height-md`, `z(modal)`).
- **Breakpoints** are defined in two places: `$breakpoints` in `_variables.scss` and `BREAKPOINTS` in `src/config/constants.ts`. If you change one, change the other.

## Code quality

- **TypeScript:** `strict`, `noUncheckedIndexedAccess`, and no `any`. Component variants use discriminated unions. For example, `Button` with `iconOnly` requires `icon` and `aria-label`.
- **ESLint** (`eslint.config.js`): `typescript-eslint` strict, `react-hooks`, `react-refresh`, `no-console` (only `warn` and `error` are allowed), and `ban-ts-comment` (requires a description). `eslint-config-prettier` turns off rules that conflict with Prettier.
- **Prettier** (`.prettierrc.json`): single quotes, trailing commas, and a 100-character line width.
- **Logging:** errors go through `reportError` in `src/utils/logger.ts`. Connect your monitoring service there.

## Accessibility

- Skip link on public and dashboard layouts.
- Visible focus rings everywhere.
- Inputs are labelled and linked to their helper and error text with `aria-describedby` and `aria-invalid`.
- `Modal` renders through a portal, uses `role="dialog"` and `aria-modal`, closes on Escape, traps focus, returns focus to where it was on close, and locks page scroll.
- On mobile the sidebar is a drawer: it traps focus, closes on Escape, and is `inert` while closed.
- Respects `prefers-reduced-motion`.
#   p r a c t i c e - s c s s  
 