import { GraphQLHandler, RestHandler } from "msw";
import {
  gqlHandlers as authGqlHandlers,
  restHandlers as authRestHandlers,
} from "./auth";
import authMiddleware from "./authMiddleware";
import delayMiddleware from "./delayMiddleware";
import {
  gqlHandlers as profileGqlHandlers,
  restHandlers as profileRestHandlers,
} from "./profile";
import {
  gqlHandlers as userGqlHandlers,
  restHandlers as userRestHandlers,
} from "./user";

export const restHandlers = ([] as RestHandler[])
  .concat(delayMiddleware)
  .concat(authMiddleware)
  .concat(authRestHandlers)
  .concat(userRestHandlers)
  .concat(profileRestHandlers);

export const gqlHandlers = ([] as GraphQLHandler[])
  .concat(authGqlHandlers)
  .concat(userGqlHandlers)
  .concat(profileGqlHandlers);
