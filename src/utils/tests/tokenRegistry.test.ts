import { TokenRegistry } from "@utils/TokenRegistry";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("TokenRegistry", () => {
  afterEach(() => {
    sessionStorage.clear();
    TokenRegistry.reset();
  });

  it("should set the token", () => {
    TokenRegistry.token = "token";

    expect(sessionStorage.getItem("TOKEN")).toBe(JSON.stringify("token"));
  });

  it("should get the token", () => {
    TokenRegistry.token = "token";

    expect(TokenRegistry.token).toBe("token");
  });
});
