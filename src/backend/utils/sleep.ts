import { setRafTimeout } from "../../utils/http/utils";

export async function sleep(ms = 0) {
  if (ms <= 0) {
    return Promise.resolve();
  }
  return new Promise<void>((resolve) => setRafTimeout(resolve, ms));
}
