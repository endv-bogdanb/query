import { setupWorker } from "msw/browser";
import { gqlHandlers, restHandlers } from "./handlers";

export const worker = setupWorker(...restHandlers, ...gqlHandlers);
