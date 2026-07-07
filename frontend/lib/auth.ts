import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "stockflow_access";
const REFRESH_TOKEN_KEY = "stockflow_refresh";

/**
 * Token storage uses js-cookie (client-readable cookies).
 * Tradeoff: not httpOnly, so tokens are accessible to JS (XSS risk).
 * Prefer httpOnly cookies set by the backend when that endpoint supports it.
 */
export function setTokens(access: string, refresh: string) {
  const opts = { expires: 7, sameSite: "strict" as const, secure: process.env.NODE_ENV === "production" };
  Cookies.set(ACCESS_TOKEN_KEY, access, opts);
  Cookies.set(REFRESH_TOKEN_KEY, refresh, opts);
}

export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | undefined {
  return Cookies.get(REFRESH_TOKEN_KEY);
}

export function clearTokens() {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}
