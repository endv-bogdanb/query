import { rest } from "msw";
import { db } from "../db";
import { JWT, makeUrl } from "../utils";
import { loginReqSchema } from "@models";

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
        const jwt = await JWT.jwt({ id: user.id });

        return res(ctx.status(200), ctx.json({ user, token: jwt }));
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
];

export default handlers;
