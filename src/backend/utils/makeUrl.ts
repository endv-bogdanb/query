export function makeUrl(path = "", prefix = "/api") {
  const baseURl = window.location.origin;
  const url = new URL(`${prefix}/${path}`, baseURl);
  console.log("make url ", url.toString());
  return url.toString();
}
