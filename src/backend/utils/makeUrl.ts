export function makeUrl(path = "") {
  const baseURl = window.location.origin;
  const url = new URL(`api/${path}`, baseURl);
  return url.toString();
}
