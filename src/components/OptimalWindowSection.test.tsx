import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getOptimalWindow } from "../api";
import OptimalWindowSection from "./OptimalWindowSection";

vi.mock("../api", () => ({
  getEnergyMix: vi.fn(),
  getOptimalWindow: vi.fn(),
}));

const calculateButton = () => screen.getByRole("button", { name: "Calculate" });
const durationInput = () => screen.getByLabelText(/Charging duration/);

describe("OptimalWindowSection", () => {
  beforeEach(() => {
    vi.mocked(getOptimalWindow).mockReset();
  });

  it("calls the API with the default duration and shows the result", async () => {
    vi.mocked(getOptimalWindow).mockResolvedValue({
      startDateTime: "2026-01-01T01:00:00Z",
      endDateTime: "2026-01-01T04:00:00Z",
      averageCleanEnergyPercentage: 82.5,
    });
    const user = userEvent.setup();

    render(<OptimalWindowSection />);
    await user.click(calculateButton());

    expect(getOptimalWindow).toHaveBeenCalledWith(3);
    expect(await screen.findByText(/82\.5%/)).toBeInTheDocument();
  });

  it.each(["", "0", "7", "-1", "2.5"])(
    "blocks the calculation and explains why when the duration is %j",
    async (value) => {
      const user = userEvent.setup();
      render(<OptimalWindowSection />);

      await user.clear(durationInput());
      if (value !== "") {
        await user.type(durationInput(), value);
      }

      expect(calculateButton()).toBeDisabled();
      expect(screen.getByRole("alert")).toHaveTextContent("between 1 and 6");
      expect(getOptimalWindow).not.toHaveBeenCalled();
    },
  );

  it("shows an error message when the request fails", async () => {
    vi.mocked(getOptimalWindow).mockRejectedValue(new Error("boom"));
    const user = userEvent.setup();

    render(<OptimalWindowSection />);
    await user.click(calculateButton());

    expect(await screen.findByRole("alert")).toHaveTextContent("Failed to calculate optimal window.");
  });
});