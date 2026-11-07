import { useCallback, useState } from "react";
import { getOptimalWindow } from "../api";
import { getErrorMessage } from "../getErrorMessage";
import type { OptimalChargingWindow } from "../types";

interface OptimalWindowState {
  result: OptimalChargingWindow | null;
  loading: boolean;
  error: string | null;
  calculate: (durationHours: number) => Promise<void>;
}

export function useOptimalWindow(): OptimalWindowState {
  const [result, setResult] = useState<OptimalChargingWindow | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback(async (durationHours: number) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(await getOptimalWindow(durationHours));
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to calculate optimal window."));
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, error, calculate };
}