import { RestHandler } from "msw";
import { db } from "../db";
import { makeUrl } from "../utils";
import authHandlers from "./auth";
import authMiddleware from "./authMiddleware";

export const handlers = ([] as RestHandler[])
  .concat(authMiddleware)
  .concat(authHandlers)
  .concat(db.user.toHandlers("rest", makeUrl()))
  .concat(db.profile.toHandlers("rest", makeUrl()));
