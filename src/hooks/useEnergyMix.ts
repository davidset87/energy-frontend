import { useEffect, useState } from "react";
import { getEnergyMix } from "../api";
import { getErrorMessage } from "../getErrorMessage";
import type { DailyEnergyMix } from "../types";

interface EnergyMixState {
  data: DailyEnergyMix[];
  loading: boolean;
  error: string | null;
}

export function useEnergyMix(): EnergyMixState {
  const [data, setData] = useState<DailyEnergyMix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getEnergyMix()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(getErrorMessage(err, "Failed to load energy mix data."));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}