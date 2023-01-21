import { graphql, rest } from "msw";
import { BackendRepository, RepositoryError } from "../db";
import { makeUrl } from "../utils";

export const restHandlers = [
  rest.get(makeUrl("profiles"), async (req, res, ctx) => {
    try {
      const response = await BackendRepository.profileList();
      return res(ctx.status(200), ctx.json(response));
    } catch (err) {
      const error = RepositoryError.toJson(err);
      return res(ctx.status(error.code), ctx.json(error));
    }
  }),

  rest.get(makeUrl("profiles/:id"), async (req, res, ctx) => {
    try {
      const { id } = req.params;
      const response = await BackendRepository.profile(+id);
      return res(ctx.status(200), ctx.json(response));
    } catch (err) {
      const error = RepositoryError.toJson(err);
      return res(ctx.status(error.code), ctx.json(error));
    }
  }),
];

export const gqlHandlers = [
  graphql.query("GetProfiles", async (req, res, ctx) => {
    try {
      const response = await BackendRepository.profileList();
      return res(ctx.data(response));
    } catch (err) {
      return res(ctx.errors([RepositoryError.toJson(err)]));
    }
  }),

  graphql.query("GetProfile", async (req, res, ctx) => {
    try {
      const { id } = req.variables;
      const response = await BackendRepository.profile(+id);
      return res(ctx.data(response));
    } catch (err) {
      return res(ctx.errors([RepositoryError.toJson(err)]));
    }
  }),
];
