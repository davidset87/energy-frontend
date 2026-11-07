import type { AverageMix, FuelType } from "./types";

export interface ChartSlice {
  name: FuelType;
  value: number;
}

export const FUEL_COLORS: Record<FuelType, string> = {
  biomass: "#8BC34A",
  coal: "#424242",
  imports: "#9E9E9E",
  gas: "#FF7043",
  nuclear: "#FFC107",
  other: "#BDBDBD",
  hydro: "#29B6F6",
  solar: "#FFD54F",
  wind: "#4FC3F7",
};

/** Keeps the fuels that contribute something and sorts them from largest to smallest share. */
export function toChartData(averageMix: AverageMix): ChartSlice[] {
  return (Object.entries(averageMix) as [FuelType, number | undefined][])
    .filter((entry): entry is [FuelType, number] => entry[1] !== undefined && entry[1] > 0)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}