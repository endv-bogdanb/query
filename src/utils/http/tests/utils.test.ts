import { describe, expect, it, vi } from "vitest";
import { HttpError } from "../HttpError";
import { httpErrorMessage, parseResponse, setRafTimeout } from "../utils";

describe("http-utils", () => {
  describe("parseResponse", () => {
    it("should parse response as text", async () => {
      const response = new Response("text response", {
        status: 200,
        headers: {
          "content-type": "text/plain",
        },
      });

      const { txt, json } = await parseResponse(response);

      expect(txt).toBe("text response");
      expect(json).toBe(null);
    });

    it("should parse response as json", async () => {
      const response = new Response(JSON.stringify({ test: "value" }), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });

      const { txt, json } = await parseResponse(response);

      expect(txt).toBe(JSON.stringify({ test: "value" }));
      expect(json).toStrictEqual({ test: "value" });
    });

    it("Should throw error if json is missing", async () => {
      const response = new Response("", {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });

      await expect(parseResponse(response)).rejects.toThrow(
        new HttpError(
          "Could not parse the response",
          422,
          "Unprocessable Entity"
        )
      );
    });

    it("should throw error", async () => {
      const response = new Response("text response", {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      });

      await expect(parseResponse(response)).rejects.toThrow(
        new HttpError(
          "Could not parse the response",
          422,
          "Unprocessable Entity"
        )
      );
    });
  });

  describe("httpErrorMessage", () => {
    it("should return error message", () => {
      const response = { txt: "", json: { message: "Error message" } };
      expect(httpErrorMessage(response)).toBe("Error message");
    });

    it("should return text", () => {
      const response = { txt: "Error message", json: null };
      expect(httpErrorMessage(response)).toBe("Error message");
    });

    it("should return json stringify", () => {
      const response = { txt: "Error message", json: { value: "text" } };
      expect(httpErrorMessage(response)).toBe(
        JSON.stringify({ value: "text" })
      );
    });
  });

  describe("setRafTimeout", () => {
    it("should call function after delay", () => {
      vi.useFakeTimers();
      const callback = vi.fn();

      vi.spyOn(window, "requestAnimationFrame").mockImplementation(
        (callback) => {
          return setTimeout(callback, 0, 150) as unknown as number;
        }
      );

      vi.spyOn(performance, "now").mockImplementationOnce(() => 0);

      setRafTimeout(callback, 150, "a", 1, false);

      vi.runAllTimers();

      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toHaveBeenCalledWith("a", 1, false);

      vi.restoreAllMocks();
      vi.useRealTimers();
    });

    it("should cancel function call", () => {
      vi.useFakeTimers();
      const callback = vi.fn();

      vi.spyOn(window, "requestAnimationFrame").mockImplementation(
        (callback) => {
          return setTimeout(callback, 0, 150) as unknown as number;
        }
      );

      vi.spyOn(window, "cancelAnimationFrame").mockImplementation((value) => {
        clearTimeout(value);
      });

      vi.spyOn(performance, "now").mockImplementationOnce(() => 0);

      const cancel = setRafTimeout(callback, 150, "a", 1, false);

      cancel();

      vi.runAllTimers();

      expect(callback).not.toHaveBeenCalled();

      vi.restoreAllMocks();
      vi.useRealTimers();
    });
  });
});
