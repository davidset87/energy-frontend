import { describe, expect, it } from "vitest";
import { parseDuration } from "./validation";

describe("parseDuration", () => {
  it.each([
    ["1", 1],
    ["3", 3],
    ["6", 6],
    [" 4 ", 4],
  ])("accepts %j and returns %i", (input, expected) => {
    expect(parseDuration(input)).toBe(expected);
  });

  it.each(["", "   ", "0", "7", "99", "-1", "2.5", "abc"])("rejects %j", (input) => {
    expect(parseDuration(input)).toBeNull();
  });
});