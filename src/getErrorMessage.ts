import axios from "axios";

/** Returns the message sent by our API ({ error: "..." }) when there is one, otherwise the fallback. */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { error?: string } | undefined;
    if (data?.error) {
      return data.error;
    }
  }
  return fallback;
}