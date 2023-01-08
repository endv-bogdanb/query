import { rest } from "msw";
import { makeUrl, sleep } from "@backend/utils";

async function delayMiddleware() {
  const delay = import.meta.env.DEV ? 500 : 1000;
  await sleep(delay);
  return undefined;
}

const handlers = [
  rest.get(makeUrl("*"), delayMiddleware),
  rest.post(makeUrl("*"), delayMiddleware),
  rest.put(makeUrl("*"), delayMiddleware),
  rest.patch(makeUrl("*"), delayMiddleware),
  rest.delete(makeUrl("*"), delayMiddleware),
];

export default handlers;
