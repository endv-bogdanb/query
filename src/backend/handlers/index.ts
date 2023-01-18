import { GraphQLHandler, RestHandler } from "msw";
import { db } from "../db";
import { makeUrl } from "../utils";
import authHandlers from "./auth";
import authMiddleware from "./authMiddleware";
import delayMiddleware from "./delayMiddleware";

export const restHandlers = ([] as RestHandler[])
  .concat(delayMiddleware)
  .concat(authMiddleware)
  .concat(authHandlers)
  .concat(db.user.toHandlers("rest", makeUrl()))
  .concat(db.profile.toHandlers("rest", makeUrl()));

export const gqlHandlers = ([] as GraphQLHandler[]).concat(
  db.user.toHandlers("graphql", makeUrl("", "gql"))
);
