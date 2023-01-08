import { ResponseComposition, rest, RestContext, RestRequest } from "msw";
import { isAuthenticated, isPublicApi, makeUrl } from "@backend/utils";

async function authMiddleware(
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext
) {
  if (!isPublicApi(req.url.pathname) && !(await isAuthenticated(req.headers))) {
    return res(ctx.status(401), ctx.json({ message: "Unauthorized" }));
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
