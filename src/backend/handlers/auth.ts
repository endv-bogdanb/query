import { rest } from "msw";
import { loginReqSchema, refreshReqSchema } from "@models";
import { db } from "../db";
import { bearerSchema, JWT, makeUrl } from "../utils";

const handlers = [
  rest.post(makeUrl("login"), async (req, res, ctx) => {
    const payload = await req.json();
    const body = loginReqSchema.safeParse(payload);

    if (body.success) {
      const { data } = body;
      const user = db.user.findFirst({
        where: { username: { equals: data.username } },
      });

      if (user?.password === data.password) {
        const token = await JWT.jwt({ id: user.id });
        const refreshToken = crypto.randomUUID();

        return res(ctx.status(200), ctx.json({ user, token, refreshToken }));
      }

      return res(
        ctx.status(400),
        ctx.json({ message: "Invalid credentials", status: 400 })
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({ message: "Invalid credentials", status: 400 })
      );
    }
  }),

  rest.post(makeUrl("refresh"), async (req, res, ctx) => {
    const payload = await req.json();
    const body = refreshReqSchema.safeParse(payload);

    const jwt = bearerSchema.safeParse(req.headers.get("Authorization"));

    if (body.success && jwt.success) {
      const { userId } = JWT.decode(jwt.data);

      const token = await JWT.jwt({ id: userId });
      const refreshToken = crypto.randomUUID();

      return res(ctx.status(200), ctx.json({ token, refreshToken }));
    } else {
      return res(
        ctx.status(401),
        ctx.json({ message: "Unauthorized", status: 400 })
      );
    }
  }),
];

export default handlers;
