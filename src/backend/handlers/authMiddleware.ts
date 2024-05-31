import { http, HttpResponse, type HttpResponseResolver } from "msw";
import { RepositoryError, Unauthorized } from "@backend/db";
import { isAuthenticated, isPublicApi, makeUrl } from "@backend/utils";

const authMiddleware: HttpResponseResolver = async ({ request }) => {
  const pathname = new URL(request.url).pathname;
  if (!isPublicApi(pathname) && !(await isAuthenticated(request.headers))) {
    const error = RepositoryError.toJson(new Unauthorized());
    return HttpResponse.json(error, { status: error.code });
  }
};

const handlers = [
  http.get(makeUrl("*"), authMiddleware),
  http.post(makeUrl("*"), authMiddleware),
  http.put(makeUrl("*"), authMiddleware),
  http.patch(makeUrl("*"), authMiddleware),
  http.delete(makeUrl("*"), authMiddleware),
];

export default handlers;
