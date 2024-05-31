import { GraphQLHandler, HttpHandler } from "msw";
import {
  gqlHandlers as authGqlHandlers,
  httpHandlers as authHttpHandlers,
} from "./auth";
import authMiddleware from "./authMiddleware";
import delayMiddleware from "./delayMiddleware";
import {
  gqlHandlers as profileGqlHandlers,
  httpHandlers as profileHttpHandlers,
} from "./profile";
import {
  gqlHandlers as userGqlHandlers,
  httpHandlers as userHttpHandlers,
} from "./user";

export const restHandlers = ([] as HttpHandler[])
  .concat(delayMiddleware)
  .concat(authMiddleware)
  .concat(authHttpHandlers)
  .concat(userHttpHandlers)
  .concat(profileHttpHandlers);

export const gqlHandlers = ([] as GraphQLHandler[])
  .concat(authGqlHandlers)
  .concat(userGqlHandlers)
  .concat(profileGqlHandlers);
