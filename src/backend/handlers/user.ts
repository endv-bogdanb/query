import { graphql, rest } from "msw";
import { BackendRepository, RepositoryError } from "../db";
import { makeUrl } from "../utils";

export const restHandlers = [
  rest.get(makeUrl("users"), async (req, res, ctx) => {
    try {
      const response = await BackendRepository.userList();
      return res(ctx.status(200), ctx.json(response));
    } catch (err) {
      const error = RepositoryError.toJson(err);
      return res(ctx.status(error.code), ctx.json(error));
    }
  }),

  rest.get(makeUrl("users/:id"), async (req, res, ctx) => {
    try {
      const { id } = req.params;
      const response = await BackendRepository.user(+id);
      return res(ctx.status(200), ctx.json(response));
    } catch (err) {
      const error = RepositoryError.toJson(err);
      return res(ctx.status(error.code), ctx.json(error));
    }
  }),
];

export const gqlHandlers = [
  graphql.query("GetUsers", async (req, res, ctx) => {
    try {
      const response = await BackendRepository.userList();
      return res(ctx.data(response));
    } catch (err) {
      return res(ctx.errors([RepositoryError.toJson(err)]));
    }
  }),

  graphql.query("GetUser", async (req, res, ctx) => {
    try {
      const { id } = req.variables;
      const response = await BackendRepository.user(+id);
      return res(ctx.data(response));
    } catch (err) {
      return res(ctx.errors([RepositoryError.toJson(err)]));
    }
  }),
];
