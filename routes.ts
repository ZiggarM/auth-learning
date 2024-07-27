/**
 * An Array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
];

/**
 * An Array of routes that are accessible to authenticated users
 * These routes will redirect users to /settings
 * These routes do not require authentication
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
];

/**
 * The prefix for all API routes
 * These routes do not require authentication
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after logging in
 * These routes do not require authentication
 * @type {string[]}
 */

export const DEFAULT_LOGIN_REDIRECTION = "/settings"