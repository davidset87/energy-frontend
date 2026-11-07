/** Formats an ISO date for display. The time zone defaults to the user's local one. */
export function formatDateTime(iso: string, timeZone?: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone,
  }).format(new Date(iso));
}