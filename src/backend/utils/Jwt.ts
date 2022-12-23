import * as jose from "jose";
import { z } from "zod";

const storedKeysSchema = z
  .string()
  .transform((v) => JSON.parse(v))
  .pipe(
    z.object({
      publickey: z
        .string()
        .transform(async (value) => await jose.importSPKI(value, "ES256")),
      privatekey: z
        .string()
        .transform(async (value) => await jose.importPKCS8(value, "ES256")),
    })
  );

export interface IRetrieve {
  publicKey: jose.KeyLike;
  privateKey: jose.KeyLike;
}

let publicKey: jose.KeyLike;
let privateKey: jose.KeyLike;

export class JWT {
  static async verify(jwt: string): Promise<boolean> {
    try {
      const { publicKey } = await JWT.retrieve();

      await jose.jwtVerify(jwt, publicKey!);

      return true;
    } catch (e) {
      return false;
    }
  }

  static async jwt({ id }: { id: number }): Promise<string> {
    const { privateKey } = await JWT.retrieve();
    return await new jose.SignJWT({
      "urn:example:claim": true,
      userId: id,
    })
      .setProtectedHeader({ alg: "ES256" })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("1h")
      .sign(privateKey);
  }

  static decode = (jwt: string) => {
    return jose.decodeJwt(jwt) as jose.JWTPayload & {
      userId: number;
    };
  };

  static store = async (): Promise<void> => {
    if (!publicKey || !privateKey) {
      return Promise.resolve();
    }
    const publickey = await jose.exportSPKI(publicKey);
    const privatekey = await jose.exportPKCS8(privateKey);

    const keys = JSON.stringify({ publickey, privatekey });

    sessionStorage.setItem("JWT_KEYS", keys);
  };

  static retrieve = async (): Promise<IRetrieve> => {
    if (!publicKey || !privateKey) {
      const keys = sessionStorage.getItem("JWT_KEYS");
      try {
        ({ publickey: publicKey, privatekey: privateKey } =
          await storedKeysSchema.parseAsync(keys));
      } catch {
        ({ publicKey, privateKey } = await jose.generateKeyPair("ES256", {
          extractable: true,
        }));
        await JWT.store();
      }
    }

    return { publicKey, privateKey };
  };
}
