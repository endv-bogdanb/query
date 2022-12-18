export function makeUrl(path: string = "") {
  const url = new URL(`api/${path}`, window.location.origin);
  return url.toString();
}
