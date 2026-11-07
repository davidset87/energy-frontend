import { MAX_DURATION_HOURS, MIN_DURATION_HOURS } from "./constants";

/**
 * Parses the raw text of the duration input.
 * Returns the number of hours, or null when the value is empty, not a whole number,
 * or outside the allowed range.
 */
export function parseDuration(input: string): number | null {
  const trimmed = input.trim();
  if (trimmed === "") {
    return null;
  }

  const value = Number(trimmed);
  if (!Number.isInteger(value) || value < MIN_DURATION_HOURS || value > MAX_DURATION_HOURS) {
    return null;
  }

  return value;
}