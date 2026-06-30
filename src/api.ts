import axios from "axios";
import type { DailyEnergyMix, OptimalChargingWindow } from "./types";

const API_BASE_URL = "http://localhost:5252/api/energy";

export async function getEnergyMix(): Promise<DailyEnergyMix[]> {
  const response = await axios.get<DailyEnergyMix[]>(`${API_BASE_URL}/mix`);
  return response.data;
}

export async function getOptimalWindow(durationHours: number): Promise<OptimalChargingWindow> {
  const response = await axios.get<OptimalChargingWindow>(
    `${API_BASE_URL}/optimal-window`,
    { params: { durationHours } }
  );
  return response.data;
}