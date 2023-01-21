import { bearerSchema, JWT } from "@backend/utils";
import { loginReqSchema, refreshReqSchema } from "@models";
import { db } from "../database";
import { InvalidCredentials, NotFound, Unauthorized } from "./error";

export class BackendRepository {
  static login = async (payload: unknown) => {
    const loginReq = loginReqSchema.safeParse(payload);

    if (!loginReq.success) {
      throw new InvalidCredentials();
    }

    const { data } = loginReq;

    const userRecord = db.user.findFirst({
      where: { username: { equals: data.username } },
    });

    if (!userRecord) {
      throw new InvalidCredentials();
    }

    if (userRecord.password !== data.password) {
      throw new InvalidCredentials();
    }

    const token = await JWT.jwt({ id: userRecord.id });
    const refreshToken = crypto.randomUUID();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = userRecord;

    return { token, refreshToken, user };
  };

  static refresh = async (payload: unknown, encodedToken: unknown) => {
    const refreshReq = refreshReqSchema.safeParse(payload);
    const jwt = bearerSchema.safeParse(encodedToken);

    if (!refreshReq.success || !jwt.success) {
      throw new Unauthorized();
    }
    const { userId } = JWT.decode(jwt.data);

    const token = await JWT.jwt({ id: userId });
    const refreshToken = crypto.randomUUID();

    return { token, refreshToken };
  };

  static userList = async () => {
    return db.user.findMany({});
  };

  static user = async (id: number) => {
    const userRecord = db.user.findFirst({ where: { id: { equals: id } } });

    if (!userRecord) {
      throw new NotFound("User does not exists");
    }

    return userRecord;
  };

  static profileList = async () => {
    return db.profile.findMany({});
  };

  static profile = async (id: number) => {
    const profileRecord = db.profile.findFirst({
      where: { id: { equals: id } },
    });

    if (!profileRecord) {
      throw new NotFound("Profile does not exists");
    }

    return profileRecord;
  };
}
