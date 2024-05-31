import { graphql, http, HttpResponse } from "msw";
import { BackendRepository, RepositoryError } from "../db";
import { makeUrl } from "../utils";

export const httpHandlers = [
  http.post(makeUrl("login"), async ({ request }) => {
    try {
      const payload = await request.json();

      const response = await BackendRepository.login(payload);

      return HttpResponse.json(response, { status: 200 });
    } catch (err) {
      const error = RepositoryError.toJson(err);
      return HttpResponse.json(error, { status: error.code });
    }
  }),

  http.post(makeUrl("refresh"), async ({ request }) => {
    try {
      const payload = await request.json();
      const encodedToken = request.headers.get("Authorization");

      const response = await BackendRepository.refresh(payload, encodedToken);

      return HttpResponse.json(response, { status: 200 });
    } catch (err) {
      const error = RepositoryError.toJson(err);
      return HttpResponse.json(error, { status: error.code });
    }
  }),
];

export const gqlHandlers = [
  graphql.mutation("Login", async ({ variables }) => {
    try {
      const payload = variables;

      const response = await BackendRepository.login(payload);

      return HttpResponse.json({ data: response });
    } catch (err) {
      return HttpResponse.json({ errors: [RepositoryError.toJson(err)] });
    }
  }),
];
