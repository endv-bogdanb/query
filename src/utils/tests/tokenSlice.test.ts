import { afterEach, describe, expect, it } from "vitest";
import { tokenSlice } from "@utils/tokenSlice";

describe("tokenSlice", () => {
  afterEach(() => {
    sessionStorage.clear();
    tokenSlice.dispatch({ type: "reset" });
  });

  it("should setup token slice", () => {
    sessionStorage.setItem("TOKEN", JSON.stringify("token-value"));
    sessionStorage.setItem(
      "REFRESH_TOKEN",
      JSON.stringify("refresh-token-value"),
    );

    tokenSlice.dispatch({ type: "setup" });

    expect(tokenSlice.state.token).toBe("token-value");
    expect(tokenSlice.state.refreshToken).toBe("refresh-token-value");
  });

  it("should set the token", () => {
    tokenSlice.dispatch({ type: "set", payload: { token: "token" } });

    expect(sessionStorage.getItem("TOKEN")).toBe(JSON.stringify("token"));
    expect(tokenSlice.state.token).toBe("token");
  });

  it("should set the refresh token", () => {
    tokenSlice.dispatch({ type: "set", payload: { refreshToken: "token" } });

    expect(sessionStorage.getItem("REFRESH_TOKEN")).toBe(
      JSON.stringify("token"),
    );
    expect(tokenSlice.state.refreshToken).toBe("token");
  });
});
