export function calculateRiskReward(input: { entry: number; stop: number; target: number }) {
  const { entry, stop, target } = input;

  if (!Number.isFinite(entry) || !Number.isFinite(stop) || !Number.isFinite(target) || entry <= 0) {
    return { riskPercent: 0, rewardPercent: 0, rr: 0 };
  }

  const riskPercent = ((entry - stop) / entry) * 100;
  const rewardPercent = ((target - entry) / entry) * 100;
  const rr = riskPercent > 0 ? rewardPercent / riskPercent : 0;

  return {
    riskPercent: round(riskPercent),
    rewardPercent: round(rewardPercent),
    rr: round(rr)
  };
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}
