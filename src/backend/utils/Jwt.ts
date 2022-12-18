import * as jose from "jose";

let publicKey: jose.GenerateKeyPairResult["publicKey"];
let privateKey: jose.GenerateKeyPairResult["privateKey"];

export class JWT {
  static async setUp(): Promise<void> {
    ({ publicKey, privateKey } = await jose.generateKeyPair("ES256"));
  }

  static async verify(jwt: string): Promise<void> {
    if (JWT.shouldSetup) {
      await JWT.setUp();
    }
    await jose.jwtVerify(jwt, publicKey!);
  }

  static async jwt(): Promise<string> {
    if (JWT.shouldSetup) {
      await JWT.setUp();
    }

    return await new jose.SignJWT({
      "urn:example:claim": true,
    })
      .setProtectedHeader({ alg: "ES256" })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("1h")
      .sign(privateKey);
  }

  static get shouldSetup() {
    return !publicKey || !privateKey;
  }
}
