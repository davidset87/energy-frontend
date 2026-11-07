export type FuelType =
  | "biomass"
  | "coal"
  | "imports"
  | "gas"
  | "nuclear"
  | "other"
  | "hydro"
  | "solar"
  | "wind";

export type AverageMix = Partial<Record<FuelType, number>>;

export interface DailyEnergyMix {
  date: string;
  averageMix: AverageMix;
  cleanEnergyPercentage: number;
}

export interface OptimalChargingWindow {
  startDateTime: string;
  endDateTime: string;
  averageCleanEnergyPercentage: number;
}