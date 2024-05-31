import { delay, http } from "msw";
import { makeUrl } from "@backend/utils";

async function delayMiddleware() {
  console.log("i'm in delay middleware");
  const ms = import.meta.env.DEV ? undefined : 1000;
  await delay(ms);
}

const handlers = [
  http.get(makeUrl("*"), delayMiddleware),
  http.post(makeUrl("*"), delayMiddleware),
  http.put(makeUrl("*"), delayMiddleware),
  http.patch(makeUrl("*"), delayMiddleware),
  http.delete(makeUrl("*"), delayMiddleware),
];

export default handlers;
