import { RestRequest } from "msw";
import * as jose from "jose";

export const { publicKey, privateKey } = await jose.generateKeyPair("ES256");

export const PUBLIC_ROUTES = ["/api/login", "/api/isAuthenticated"];

export function makeUrl(path: string = "") {
  const url = new URL(`api/${path}`, window.location.origin);
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

    const [, jwt] = bearer.split(" ");

    await jose.jwtVerify(jwt, publicKey);

    return true;
  } catch {
    return false;
  }
}
