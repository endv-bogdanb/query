import { describe, expect, it } from "vitest";
import { getPublicUrl } from "@utils/getPublicUrl";

describe("getPublicUrl", () => {
  it("should return public url", () => {
    expect(getPublicUrl("/test")).toBe("/test");
  });

  it("should return public url if it has /", () => {
    expect(getPublicUrl("test")).toBe("/test");
  });

  it("should return public url if it has more than one /", () => {
    expect(getPublicUrl("//test")).toBe("/test");
    expect(getPublicUrl("///test")).toBe("/test");
  });

  it("should return production public url", () => {
    const nodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    expect(getPublicUrl("///test")).toBe("/query/test");
    process.env.NODE_ENV = nodeEnv;
  });
});
