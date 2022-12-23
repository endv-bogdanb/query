import { z } from "zod";

export const userProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  logo: z.string().url(),
});

export const userSchema = z.object({
  id: z.number().positive(),
  username: z.string(),
  profile: userProfileSchema,
});

export type TUser = z.infer<typeof userSchema>;

export const usersSchema = z.array(userSchema);

export type TUsers = z.infer<typeof usersSchema>;

export const loginReqSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type TLoginReq = z.infer<typeof loginReqSchema>;

export const loginResSchema = z.object({
  user: userSchema,
  token: z.string(),
});

export type TLoginRes = z.infer<typeof loginResSchema>;
