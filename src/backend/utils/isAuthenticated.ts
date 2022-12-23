import { RestRequest } from "msw";
import { JWT } from "./Jwt";
import { z } from "zod";

const bearerSchema = z
  .string()
  .refine((value) => value.startsWith("Bearer "), { message: "Invalid token" })
  .transform((value) => value.slice("Bearer ".length));

export async function isAuthenticated(
  headers: RestRequest["headers"]
): Promise<boolean> {
  try {
    const token = bearerSchema.parse(headers.get("Authorization"));

    return await JWT.verify(token);
  } catch {
    return false;
  }
}
