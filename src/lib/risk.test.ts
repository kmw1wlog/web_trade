import { describe, expect, it } from "vitest";
import { calculateRiskReward } from "@/lib/risk";

describe("calculateRiskReward", () => {
  it("calculates risk, reward and risk reward ratio", () => {
    expect(calculateRiskReward({ entry: 10000, stop: 9500, target: 11000 })).toEqual({
      riskPercent: 5,
      rewardPercent: 10,
      rr: 2
    });
  });
});
