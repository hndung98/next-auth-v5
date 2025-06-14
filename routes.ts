/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/new-verification",
  "/gallery",
  "/image",
  "/blogs",
  "/quiz",
  "/test",
  "/shop",
  "/music",
];

/**
 * An array of routes that are used for the authentication.
 * These routes will redirect logged in users to /settings, etc.
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/error",
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
