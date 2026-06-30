export interface DailyEnergyMix {
  date: string;
  averageMix: Record<string, number>;
  cleanEnergyPercentage: number;
}

export interface OptimalChargingWindow {
  startDateTime: string;
  endDateTime: string;
  averageCleanEnergyPercentage: number;
}