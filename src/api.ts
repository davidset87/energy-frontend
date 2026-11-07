import axios from "axios";
import type { DailyEnergyMix, OptimalChargingWindow } from "./types";

// Configured per environment through VITE_API_BASE_URL (see .env.example).
// The fallback only exists so `npm run dev` works against a local backend.
const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5252/api/energy";

export async function getEnergyMix(): Promise<DailyEnergyMix[]> {
  const response = await axios.get<DailyEnergyMix[]>(`${API_BASE_URL}/mix`);
  return response.data;
}

export async function getOptimalWindow(durationHours: number): Promise<OptimalChargingWindow> {
  const response = await axios.get<OptimalChargingWindow>(`${API_BASE_URL}/optimal-window`, {
    params: { durationHours },
  });
  return response.data;
}