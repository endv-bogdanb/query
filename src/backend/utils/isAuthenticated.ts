import { StrictRequest } from "msw";
import { z } from "zod";
import { JWT } from "./Jwt";

export const bearerSchema = z
  .string()
  .refine((value) => value.startsWith("Bearer "), { message: "Invalid token" })
  .transform((value) => value.slice("Bearer ".length));

export async function isAuthenticated(
  headers: StrictRequest<undefined>["headers"],
): Promise<boolean> {
  try {
    const token = bearerSchema.parse(headers.get("Authorization"));

    return await JWT.verify(token);
  } catch {
    return false;
  }
}
