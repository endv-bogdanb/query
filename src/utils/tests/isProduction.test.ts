import { describe, expect, it } from "vitest";
import { isProduction } from "@utils/isProduction";

describe("isProduction", () => {
  it("should return false", () => {
    expect(isProduction()).toBe(false);
  });

  it("should return true", () => {
    const nodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    expect(isProduction()).toBe(true);

    process.env.NODE_ENV = nodeEnv;
  });
});
