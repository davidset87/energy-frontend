import { describe, expect, it } from "vitest";
import { toChartData } from "./chartData";

describe("toChartData", () => {
  it("drops fuels that contribute nothing", () => {
    const result = toChartData({ gas: 60, coal: 0, wind: 40 });

    expect(result.map((slice) => slice.name)).toEqual(["gas", "wind"]);
  });

  it("sorts fuels from the largest to the smallest share", () => {
    const result = toChartData({ wind: 10, gas: 60, nuclear: 30 });

    expect(result).toEqual([
      { name: "gas", value: 60 },
      { name: "nuclear", value: 30 },
      { name: "wind", value: 10 },
    ]);
  });

  it("returns an empty list for an empty mix", () => {
    expect(toChartData({})).toEqual([]);
  });
});