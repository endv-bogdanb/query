import { isProduction } from "./isProduction";

export function getPublicUrl(path: string) {
  const url = isProduction() ? `/query/${path}` : `/${path}`;
  return url.replace(/\/\/+/, "/");
}
