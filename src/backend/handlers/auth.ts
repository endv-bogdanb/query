import { graphql, rest } from "msw";
import { BackendRepository, RepositoryError } from "../db";
import { makeUrl } from "../utils";

export const restHandlers = [
  rest.post(makeUrl("login"), async (req, res, ctx) => {
    try {
      const payload = await req.json();

      const response = await BackendRepository.login(payload);

      return res(ctx.status(200), ctx.json(response));
    } catch (err) {
      const error = RepositoryError.toJson(err);
      return res(ctx.status(error.code), ctx.json(error));
    }
  }),

  rest.post(makeUrl("refresh"), async (req, res, ctx) => {
    try {
      const payload = await req.json();
      const encodedToken = req.headers.get("Authorization");

      const response = await BackendRepository.refresh(payload, encodedToken);

      return res(ctx.status(200), ctx.json(response));
    } catch (err) {
      const error = RepositoryError.toJson(err);
      return res(ctx.status(error.code), ctx.json(error));
    }
  }),
];

export const gqlHandlers = [
  graphql.mutation("Login", async (req, res, ctx) => {
    try {
      const payload = req.variables;

      const response = await BackendRepository.login(payload);

      return res(ctx.data(response));
    } catch (err) {
      return res(ctx.errors([RepositoryError.toJson(err)]));
    }
  }),
];
