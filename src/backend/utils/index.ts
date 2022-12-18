import { RestRequest } from "msw";
import { JWT } from "./Jwt";

export * from "./Jwt";

export const PUBLIC_ROUTES = ["/api/login", "/api/isAuthenticated"];

export function makeUrl(path: string = "") {
  const origin = window.location.origin;
  const url = new URL(
    `${origin.includes("github.io") ? "/query/" : ""}api/${path}`,
    origin
  );
  return url.toString();
}

export function isPublicApi(path: string): boolean {
  return PUBLIC_ROUTES.includes(path);
}

export async function isAuthenticated(
  headers: RestRequest["headers"]
): Promise<boolean> {
  try {
    const bearer = headers.get("Authorization") ?? "";

    if (bearer.startsWith("Bearer ")) {
      const [, jwt] = bearer.split(" ");

      await JWT.verify(jwt);

      return true;
    }
    return false;
  } catch {
    return false;
  }
}
