import { ResponseComposition, rest, RestContext, RestRequest } from "msw";
import { RepositoryError, Unauthorized } from "@backend/db";
import { isAuthenticated, isPublicApi, makeUrl } from "@backend/utils";

async function authMiddleware(
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext
) {
  if (!isPublicApi(req.url.pathname) && !(await isAuthenticated(req.headers))) {
    const error = RepositoryError.toJson(new Unauthorized());
    return res(ctx.status(error.code), ctx.json(error));
  }
  return undefined;
}

const handlers = [
  rest.get(makeUrl("*"), authMiddleware),
  rest.post(makeUrl("*"), authMiddleware),
  rest.put(makeUrl("*"), authMiddleware),
  rest.patch(makeUrl("*"), authMiddleware),
  rest.delete(makeUrl("*"), authMiddleware),
];

export default handlers;
