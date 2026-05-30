import { describe, expect, it } from "vitest";
import { buildCvdDemoSeries, calculateCorrelation, normalizeSeries } from "@/lib/cvd";

describe("cvd demo utilities", () => {
  it("builds deterministic demo series", () => {
    const series = buildCvdDemoSeries("1W");
    expect(series.length).toBeGreaterThan(40);
    expect(series[0]).toHaveProperty("100k_1m");
  });

  it("normalizes values into a comparable range", () => {
    expect(normalizeSeries([10, 20, 30])).toEqual([-1, 0, 1]);
  });

  it("calculates positive and negative correlation", () => {
    expect(calculateCorrelation([1, 2, 3], [2, 4, 6])).toBe(1);
    expect(calculateCorrelation([1, 2, 3], [6, 4, 2])).toBe(-1);
  });
});
