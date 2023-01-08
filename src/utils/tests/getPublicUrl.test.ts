import { describe, expect, it } from "vitest";
import { getPublicUrl } from "@utils/getPublicUrl";

describe("getPublicUrl", () => {
  it("should return public url", () => {
    expect(getPublicUrl("/test", true)).toBe("/test");
  });

  it("should return public url if it has /", () => {
    expect(getPublicUrl("test", true)).toBe("/test");
  });

  it("should return public url if it has more than one /", () => {
    expect(getPublicUrl("//test", true)).toBe("/test");
    expect(getPublicUrl("///test", true)).toBe("/test");
  });

  it("should return production public url", () => {
    expect(getPublicUrl("///test")).toBe("/query/test");
  });
});
