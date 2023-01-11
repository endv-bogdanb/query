export function getPublicUrl(path: string, dev = false) {
  const url = dev ? `/${path}` : `/query/${path}`;
  return url.replace(/\/\/+/, "/");
}
