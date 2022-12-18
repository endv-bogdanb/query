import { rest } from "msw";
import { db } from "../db";
import { makeUrl } from "../utils";
import authHandlers from "./auth";

export const handlers = [
  rest.post(makeUrl("*"), (req, res, ctx) => {
    if (req.url.pathname === "/api/login") {
      return undefined;
    } else {
      const bearer = req.headers.get("Authorization");

      if (!bearer) {
        return res(ctx.status(401), ctx.json({ message: "Unauthorized" }));
      }
    }
    return undefined;
  }),
]
  .concat(authHandlers)
  .concat(db.user.toHandlers("rest", makeUrl()));
