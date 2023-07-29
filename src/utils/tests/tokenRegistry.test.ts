import { afterEach, describe, expect, it } from "vitest";
import { TokenRegistry } from "@utils/TokenRegistry";

describe("TokenRegistry", () => {
  afterEach(() => {
    sessionStorage.clear();
    TokenRegistry.reset();
  });

  it("should setup token registry", () => {
    sessionStorage.setItem("TOKEN", JSON.stringify("token-value"));
    sessionStorage.setItem(
      "REFRESH_TOKEN",
      JSON.stringify("refresh-token-value"),
    );
    TokenRegistry.setup();

    expect(TokenRegistry.token).toBe("token-value");
    expect(TokenRegistry.refreshToken).toBe("refresh-token-value");
  });

  it("should set the token", () => {
    TokenRegistry.token = "token";

    expect(sessionStorage.getItem("TOKEN")).toBe(JSON.stringify("token"));
  });

  it("should get the token", () => {
    TokenRegistry.token = "token";

    expect(TokenRegistry.token).toBe("token");
  });

  it("should set the refresh token", () => {
    TokenRegistry.refreshToken = "token";

    expect(sessionStorage.getItem("REFRESH_TOKEN")).toBe(
      JSON.stringify("token"),
    );
  });

  it("should get the refresh token", () => {
    TokenRegistry.refreshToken = "token";

    expect(TokenRegistry.refreshToken).toBe("token");
  });
});
