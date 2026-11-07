import { describe, expect, it } from "vitest";
import { formatDateTime } from "./format";

describe("formatDateTime", () => {
  it("formats an ISO date in the requested time zone", () => {
    const result = formatDateTime("2026-01-01T10:30:00Z", "UTC");

    expect(result).toMatch(/1 Jan 2026/);
    expect(result).toMatch(/10:30/);
  });

  it("converts to the requested time zone", () => {
    // Warsaw is UTC+1 in winter
    expect(formatDateTime("2026-01-01T10:30:00Z", "Europe/Warsaw")).toMatch(/11:30/);
  });
});