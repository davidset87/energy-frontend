import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getEnergyMix } from "../api";
import type { DailyEnergyMix } from "../types";
import EnergyMixSection from "./EnergyMixSection";

vi.mock("../api", () => ({
  getEnergyMix: vi.fn(),
  getOptimalWindow: vi.fn(),
}));

const day = (date: string, gas: number, wind: number): DailyEnergyMix => ({
  date,
  averageMix: { gas, wind },
  cleanEnergyPercentage: wind,
});

describe("EnergyMixSection", () => {
  beforeEach(() => {
    vi.mocked(getEnergyMix).mockReset();
  });

  it("shows a loading message while the data is being fetched", () => {
    vi.mocked(getEnergyMix).mockReturnValue(new Promise(() => {}));

    render(<EnergyMixSection />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading energy data...");
  });

  it("renders one card per day with the fuel shares", async () => {
    vi.mocked(getEnergyMix).mockResolvedValue([
      day("2026-01-01", 60, 40),
      day("2026-01-02", 70, 30),
      day("2026-01-03", 80, 20),
    ]);

    render(<EnergyMixSection />);

    expect(await screen.findByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Tomorrow")).toBeInTheDocument();
    expect(screen.getByText("Day after tomorrow")).toBeInTheDocument();
    expect(screen.getByText("Clean energy: 40%")).toBeInTheDocument();
    expect(screen.getByText("60.0%")).toBeInTheDocument();
  });

  it("shows at most three days", async () => {
    vi.mocked(getEnergyMix).mockResolvedValue([
      day("2026-01-01", 60, 40),
      day("2026-01-02", 70, 30),
      day("2026-01-03", 80, 20),
      day("2026-01-04", 90, 10),
    ]);

    render(<EnergyMixSection />);

    expect(await screen.findAllByRole("table")).toHaveLength(3);
  });

  it("shows an error message when the request fails", async () => {
    vi.mocked(getEnergyMix).mockRejectedValue(new Error("boom"));

    render(<EnergyMixSection />);

    expect(await screen.findByRole("alert")).toHaveTextContent("Failed to load energy mix data.");
  });

  it("shows an empty state when the API returns no data", async () => {
    vi.mocked(getEnergyMix).mockResolvedValue([]);

    render(<EnergyMixSection />);

    expect(await screen.findByText("No energy mix data available.")).toBeInTheDocument();
  });
});