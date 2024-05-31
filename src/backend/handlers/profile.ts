import { graphql, http, HttpResponse } from "msw";
import { BackendRepository, RepositoryError } from "../db";
import { makeUrl } from "../utils";

export const httpHandlers = [
  http.get(makeUrl("profiles"), async () => {
    try {
      const response = await BackendRepository.profileList();
      return HttpResponse.json(response, { status: 200 });
    } catch (err) {
      const error = RepositoryError.toJson(err);
      return HttpResponse.json(error, { status: error.code });
    }
  }),

  http.get(makeUrl("profiles/:id"), async ({ params }) => {
    try {
      const { id } = params;
      const response = await BackendRepository.profile(+id);
      return HttpResponse.json(response, { status: 200 });
    } catch (err) {
      const error = RepositoryError.toJson(err);
      return HttpResponse.json(error, { status: error.code });
    }
  }),
];

export const gqlHandlers = [
  graphql.query("GetProfiles", async () => {
    try {
      const response = await BackendRepository.profileList();
      return HttpResponse.json({ data: response });
    } catch (err) {
      return HttpResponse.json({ errors: [RepositoryError.toJson(err)] });
    }
  }),

  graphql.query("GetProfile", async ({ variables }) => {
    try {
      const { id } = variables;
      const response = await BackendRepository.profile(+id);
      return HttpResponse.json({ data: response });
    } catch (err) {
      return HttpResponse.json({ errors: [RepositoryError.toJson(err)] });
    }
  }),
];
