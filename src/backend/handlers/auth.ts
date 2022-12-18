import { rest } from "msw";
import { z } from "zod";
import { db } from "../db";
import { makeUrl } from "../utils";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const handlers = [
  rest.post(makeUrl("login"), async (req, res, ctx) => {
    const payload = await req.json();
    const body = loginSchema.safeParse(payload);

    if (body.success) {
      const { data } = body;
      const user = db.user.findFirst({
        where: { username: { equals: data.username } },
      });

      if (user?.password === data.password) {
        return res(ctx.status(200), ctx.json(user));
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
