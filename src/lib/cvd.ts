export type CvdBucket = "All" | "100_1k" | "1k_10k" | "10k_100k" | "100k_1m" | "1m_above";
export type CvdTimeframe = "1D" | "1W" | "1M";

export type CvdPoint = {
  label: string;
  price: number;
} & Record<CvdBucket, number>;

export const cvdBuckets: Array<{ key: CvdBucket; label: string; description: string; color: string }> = [
  { key: "All", label: "All", description: "모든 가격대의 CVD 합산", color: "#111827" },
  { key: "100_1k", label: "100-1k", description: "100달러에서 1,000달러 사이", color: "#159A80" },
  { key: "1k_10k", label: "1k-10k", description: "1,000달러에서 10,000달러 사이", color: "#9FCB78" },
  { key: "10k_100k", label: "10k-100k", description: "10,000달러에서 100,000달러 사이", color: "#D8B85F" },
  { key: "100k_1m", label: "100k-1m", description: "100,000달러에서 1,000,000달러 사이", color: "#E33E88" },
  { key: "1m_above", label: "1m+", description: "1,000,000달러 이상", color: "#F08A24" }
];

const timeframeLength: Record<CvdTimeframe, number> = {
  "1D": 36,
  "1W": 54,
  "1M": 62
};

export function buildCvdDemoSeries(timeframe: CvdTimeframe): CvdPoint[] {
  const length = timeframeLength[timeframe];
  const timeframeBoost = timeframe === "1D" ? 0.8 : timeframe === "1W" ? 1 : 1.18;
  const points: CvdPoint[] = [];

  let price = 100;
  let small = 0;
  let mid = 0;
  let upper = 0;
  let whale = 0;
  let mega = 0;

  for (let index = 0; index < length; index += 1) {
    const phase = index / Math.max(1, length - 1);
    const selloff = phase > 0.42 && phase < 0.62 ? -1 : 1;
    const rebound = phase > 0.72 ? 1.4 : 0.65;

    small += Math.sin(index / 3.2) * 8 * timeframeBoost + selloff * 2;
    mid += Math.cos(index / 4.5) * 11 * timeframeBoost + rebound * 3;
    upper += Math.sin(index / 5.5 + 0.8) * 15 * timeframeBoost + (phase > 0.5 ? 5 : -2);
    whale += (phase > 0.46 && phase < 0.58 ? -26 : phase > 0.7 ? 18 : Math.sin(index / 2.8) * 7) * timeframeBoost;
    mega += (index % 13 === 0 ? 42 : index % 17 === 0 ? -36 : Math.cos(index / 7) * 5) * timeframeBoost;

    const all = small * 0.25 + mid * 0.35 + upper * 0.55 + whale * 0.72 + mega * 0.5;
    price += all * 0.004 + Math.sin(index / 4) * 0.3 - (phase > 0.5 && phase < 0.7 ? 0.35 : 0);

    points.push({
      label: formatLabel(timeframe, index, length),
      price: Number(price.toFixed(2)),
      All: Number(all.toFixed(2)),
      "100_1k": Number(small.toFixed(2)),
      "1k_10k": Number(mid.toFixed(2)),
      "10k_100k": Number(upper.toFixed(2)),
      "100k_1m": Number(whale.toFixed(2)),
      "1m_above": Number(mega.toFixed(2))
    });
  }

  return points;
}

export function normalizeSeries(values: number[]): number[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (max === min) return values.map(() => 0);
  return values.map((value) => Number((((value - min) / (max - min)) * 2 - 1).toFixed(4)));
}

export function calculateCorrelation(left: number[], right: number[]): number {
  const length = Math.min(left.length, right.length);
  if (length < 2) return 0;
  const x = left.slice(-length);
  const y = right.slice(-length);
  const xMean = x.reduce((sum, value) => sum + value, 0) / length;
  const yMean = y.reduce((sum, value) => sum + value, 0) / length;
  const numerator = x.reduce((sum, value, index) => sum + (value - xMean) * (y[index] - yMean), 0);
  const xVariance = x.reduce((sum, value) => sum + (value - xMean) ** 2, 0);
  const yVariance = y.reduce((sum, value) => sum + (value - yMean) ** 2, 0);
  const denominator = Math.sqrt(xVariance * yVariance);
  if (denominator === 0) return 0;
  return Number((numerator / denominator).toFixed(3));
}

function formatLabel(timeframe: CvdTimeframe, index: number, length: number) {
  if (timeframe === "1D") return `${String(Math.floor(index / 3)).padStart(2, "0")}:${String((index % 3) * 20).padStart(2, "0")}`;
  if (timeframe === "1W") return `D-${Math.max(0, 6 - Math.floor((index / length) * 7))}`;
  return `${Math.max(1, 30 - Math.floor((index / length) * 30))}일 전`;
}
