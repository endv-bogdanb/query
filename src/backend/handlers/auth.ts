import { rest } from "msw";
import { z } from "zod";
import { db } from "../db";
import { makeUrl, privateKey } from "../utils";
import * as jose from "jose";

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
        const jwt = await new jose.SignJWT({
          "urn:example:claim": true,
        })
          .setProtectedHeader({ alg: "ES256" })
          .setIssuedAt()
          .setIssuer("urn:example:issuer")
          .setAudience("urn:example:audience")
          .setExpirationTime("1h")
          .sign(privateKey);

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
