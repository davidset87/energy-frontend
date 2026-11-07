import { AxiosError, type AxiosResponse } from "axios";
import { describe, expect, it } from "vitest";
import { getErrorMessage } from "./getErrorMessage";

const FALLBACK = "Something went wrong.";

describe("getErrorMessage", () => {
  it("returns the message sent by the API when there is one", () => {
    const response = { data: { error: "Carbon Intensity API returned 500." }, status: 502 } as unknown as AxiosResponse;
    const error = new AxiosError("Request failed", "ERR_BAD_RESPONSE", undefined, undefined, response);

    expect(getErrorMessage(error, FALLBACK)).toBe("Carbon Intensity API returned 500.");
  });

  it("returns the fallback when the API sent no message", () => {
    const response = { data: {}, status: 500 } as unknown as AxiosResponse;
    const error = new AxiosError("Request failed", "ERR_BAD_RESPONSE", undefined, undefined, response);

    expect(getErrorMessage(error, FALLBACK)).toBe(FALLBACK);
  });

  it("returns the fallback for errors that do not come from axios", () => {
    expect(getErrorMessage(new Error("boom"), FALLBACK)).toBe(FALLBACK);
  });
});