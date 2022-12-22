export const PUBLIC_ROUTES = ["/api/login", "/api/isAuthenticated"];

export function isPublicApi(path: string): boolean {
  return PUBLIC_ROUTES.includes(path);
}
