export function makeUrl(path: string = "") {
  const baseURl = window.location.origin;
  const url = new URL(`api/${path}`, baseURl);
  return url.toString();
}
