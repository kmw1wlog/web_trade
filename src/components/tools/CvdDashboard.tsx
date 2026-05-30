"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BarChart3, Layers3, Table2, TrendingUp } from "lucide-react";
import { buildCvdDemoSeries, calculateCorrelation, cvdBuckets, normalizeSeries, type CvdBucket, type CvdTimeframe } from "@/lib/cvd";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type ChartMode = "individual" | "integrated";
type ValueMode = "absolute" | "relative";

const rankings = [
  ["PEPE", "+101.8K", "+138.7%"],
  ["ETH", "+455.4K", "+85.7%"],
  ["BTC", "+34.8M", "+21.4%"],
  ["LINK", "+179.3K", "+20.3%"],
  ["USDC", "-94.9M", "-52.2%"],
  ["XLM", "-802.8K", "-30.8%"]
];

const heatmap = [
  ["USDC", -92, 2],
  ["BTC", 81, 2],
  ["BNB", 15, 1],
  ["SOL", 22, 1],
  ["HBAR", 5, 1],
  ["ZEC", -4, 1],
  ["FET", 3, 1],
  ["XRP", 2, 1],
  ["TRX", 1, 1],
  ["LINK", 8, 1]
] as const;

export function CvdDashboard({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const [chartMode, setChartMode] = useState<ChartMode>("integrated");
  const [valueMode, setValueMode] = useState<ValueMode>("relative");
  const [timeframe, setTimeframe] = useState<CvdTimeframe>("1W");
  const [bucket, setBucket] = useState<CvdBucket>("100k_1m");
  const [correlationWindow, setCorrelationWindow] = useState(50);

  const series = useMemo(() => buildCvdDemoSeries(timeframe), [timeframe]);
  const selectedBuckets = chartMode === "integrated" ? cvdBuckets.map((item) => item.key) : [bucket];
  const selectedCorrelation = calculateCorrelation(
    series.slice(-correlationWindow).map((point) => point[bucket]),
    series.slice(-correlationWindow).map((point) => point.price)
  );
  const HeadingTag = headingLevel;

  function trackControl(name: string, value: string | number) {
    trackEvent("cvd_demo_control_click", { name, value, timeframe, chartMode, valueMode });
  }

  return (
    <div className="grid gap-5" data-testid="cvd-dashboard">
      <section className="rounded-lg border border-line bg-white p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-4 border-b border-line pb-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">CVD DEMO</p>
            <HeadingTag className="mt-2 font-display text-3xl font-black text-navy">가격대별 CVD 시각화</HeadingTag>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              CoinGlass식 대시보드와 치과의사 사이트의 CVD 카드 구조를 참고한 MVP 데모입니다. 현재 값은 실시간 데이터가 아니라 사용법을 검증하기 위한 예시입니다.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <ToggleButton active={chartMode === "individual"} onClick={() => { setChartMode("individual"); trackControl("chartMode", "individual"); }}>
              개별 차트
            </ToggleButton>
            <ToggleButton active={chartMode === "integrated"} onClick={() => { setChartMode("integrated"); trackControl("chartMode", "integrated"); }}>
              통합 차트
            </ToggleButton>
            <a href="/waitlist?type=premium&source=cvd_demo" className="inline-flex items-center justify-center rounded-lg bg-navy px-4 py-2.5 text-sm font-black text-white">
              프리미엄 알림
            </a>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <ControlPill active={valueMode === "absolute"} onClick={() => { setValueMode("absolute"); trackControl("valueMode", "absolute"); }}>CVD 절대값</ControlPill>
          <ControlPill active={valueMode === "relative"} onClick={() => { setValueMode("relative"); trackControl("valueMode", "relative"); }}>CVD 상대값(%)</ControlPill>
          {(["1D", "1W", "1M"] as CvdTimeframe[]).map((item) => (
            <ControlPill key={item} active={timeframe === item} onClick={() => { setTimeframe(item); trackControl("timeframe", item); }}>{item}</ControlPill>
          ))}
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_260px]">
          <div>
            <CvdSvgChart series={series} buckets={selectedBuckets} valueMode={valueMode} />
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {cvdBuckets.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => { setBucket(item.key); setChartMode("individual"); trackControl("bucket", item.key); }}
                  className={cn(
                    "rounded-md border px-3 py-2 text-xs font-black transition",
                    bucket === item.key ? "border-navy bg-navy text-white" : "border-line bg-white text-navy hover:border-gold"
                  )}
                >
                  <span className="mr-1 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-cream p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-black text-navy">상관계수 계산 간격: {correlationWindow}</p>
                  <p className="mt-1 text-sm text-muted">선택 가격대 CVD와 가격의 최근 구간 연관성을 봅니다.</p>
                </div>
                <p className={cn("font-display text-3xl font-black", Math.abs(selectedCorrelation) >= 0.7 ? "text-green" : "text-gold")}>
                  {selectedCorrelation}
                </p>
              </div>
              <input
                type="range"
                min={12}
                max={60}
                value={correlationWindow}
                onChange={(event) => setCorrelationWindow(Number(event.target.value))}
                className="mt-4 w-full accent-green"
              />
            </div>
          </div>

          <aside className="rounded-lg border border-line bg-cream p-4">
            <p className="font-display text-xl font-black text-navy">티커 카테고리</p>
            <input className="mt-3 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none" placeholder="티커 검색..." />
            <div className="mt-4 grid gap-2 text-sm">
              {["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "LINKUSDT", "XRPUSDT", "PEPEUSDT", "USDC"].map((ticker, index) => (
                <button
                  key={ticker}
                  type="button"
                  className={cn("rounded-md px-3 py-2 text-left font-bold", index === 0 ? "bg-gold/15 text-gold" : "bg-white text-navy")}
                  onClick={() => trackEvent("cvd_ticker_select", { ticker })}
                >
                  {ticker}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">MARKET BREADTH</p>
              <h3 className="mt-2 font-display text-2xl font-black text-navy">CVD 코인 랭킹</h3>
            </div>
            <Table2 className="text-green" />
          </div>
          <div className="mt-4 divide-y divide-line">
            {rankings.map(([ticker, cvd, change], index) => (
              <div key={ticker} className="grid grid-cols-[36px_1fr_auto_auto] items-center gap-3 py-3 text-sm">
                <span className="text-muted">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-black text-navy">{ticker}</span>
                <span className="font-bold text-charcoal">{cvd}</span>
                <span className={change.startsWith("+") ? "font-black text-green" : "font-black text-rose-500"}>{change}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">HEATMAP</p>
              <h3 className="mt-2 font-display text-2xl font-black text-navy">CVD 히트맵</h3>
            </div>
            <Layers3 className="text-green" />
          </div>
          <div className="mt-5 grid h-[260px] grid-cols-4 gap-2">
            {heatmap.map(([ticker, value, span]) => (
              <div
                key={ticker}
                className={cn("flex flex-col justify-center rounded-lg p-3 text-center text-xs font-black", span === 2 ? "col-span-2 row-span-2" : "")}
                style={{ backgroundColor: value > 0 ? `rgba(47,111,94,${Math.min(0.85, 0.22 + Math.abs(value) / 130)})` : `rgba(231,89,89,${Math.min(0.78, 0.2 + Math.abs(value) / 130)})` }}
              >
                <span className={Math.abs(value) > 40 ? "text-white" : "text-navy"}>{ticker}</span>
                <span className={Math.abs(value) > 40 ? "text-white/90" : "text-muted"}>{value > 0 ? "+" : ""}{value}.M</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-gold" />
          <h3 className="font-display text-2xl font-black text-navy">CVD 차트 사용 가이드</h3>
        </div>
        <div className="mt-5 grid gap-5 text-sm leading-7 text-charcoal md:grid-cols-2">
          <GuideItem title="차트 모드 설명">
            CVD(Cumulative Volume Delta)는 매수와 매도 물량의 차이를 나타내는 지표로, 특정 가격대의 매수세와 매도세를 파악하는 데 도움이 됩니다.
          </GuideItem>
          <GuideItem title="화면 구성">
            개별 차트는 특정 가격대의 CVD만 보여주고, 통합 차트는 모든 가격대의 CVD를 한 번에 보여줍니다. 범례에서 가격대를 눌러 개별 흐름으로 전환할 수 있습니다.
          </GuideItem>
          <GuideItem title="가격대 구분">
            All, 100_1k, 1k_10k, 10k_100k, 100k_1m, 1m_above로 거래 규모를 나눕니다. 어떤 규모의 거래자들이 흐름을 주도하는지 관찰하는 용도입니다.
          </GuideItem>
          <GuideItem title="모드 설정">
            CVD 절대값은 거래 물량의 실제 규모를 보고, CVD 상대값은 가격대 간 추세를 비교하기 쉽게 정규화한 값입니다.
          </GuideItem>
          <GuideItem title="시간 설정">
            1D는 최근 24시간, 1W는 최근 1주일, 1M은 최근 1개월을 보는 구조입니다. 현재 MVP는 실시간 업데이트가 아닌 데모 데이터입니다.
          </GuideItem>
          <GuideItem title="상관계수와 사용 팁">
            상관계수는 -1부터 1 사이 값입니다. 절대값이 0.7 이상이면 강한 연관성으로 보고, 가격대별 CVD 흐름과 가격 흐름이 같이 움직이는지 확인합니다.
          </GuideItem>
        </div>
        <a href="/tools/indicator-finder" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-black text-white">
          이 흐름으로 조건식 찾기
          <ArrowRight size={16} />
        </a>
      </section>
    </div>
  );
}

function CvdSvgChart({ series, buckets, valueMode }: { series: ReturnType<typeof buildCvdDemoSeries>; buckets: CvdBucket[]; valueMode: ValueMode }) {
  const width = 900;
  const height = 360;
  const padding = 34;
  const priceValues = normalizeSeries(series.map((point) => point.price));
  const bucketValues = Object.fromEntries(
    cvdBuckets.map((bucket) => {
      const values = series.map((point) => point[bucket.key]);
      return [bucket.key, valueMode === "relative" ? normalizeSeries(values) : values];
    })
  ) as Record<CvdBucket, number[]>;
  const visibleValues = buckets.flatMap((key) => bucketValues[key]);
  const min = Math.min(...visibleValues, -1);
  const max = Math.max(...visibleValues, 1);
  const x = (index: number) => padding + (index / Math.max(1, series.length - 1)) * (width - padding * 2);
  const y = (value: number, localMin = min, localMax = max) => {
    const ratio = (value - localMin) / Math.max(1, localMax - localMin);
    return height - padding - ratio * (height - padding * 2);
  };
  const pricePath = toPath(priceValues.map((value, index) => [x(index), y(value, -1.1, 1.1)]));

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-[#eef3f7] p-3" data-testid="cvd-chart">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[280px] w-full md:h-[360px]" role="img" aria-label="CVD 데모 차트">
        {[0, 1, 2, 3, 4].map((line) => (
          <line key={line} x1={padding} x2={width - padding} y1={padding + line * 72} y2={padding + line * 72} stroke="#d7e0e8" strokeDasharray="4 4" />
        ))}
        <path d={pricePath} fill="none" stroke="#374151" strokeWidth="2" opacity="0.9" />
        {buckets.map((key) => {
          const bucket = cvdBuckets.find((item) => item.key === key)!;
          const values = bucketValues[key];
          const path = toPath(values.map((value, index) => [x(index), y(value)]));
          return <path key={key} d={path} fill="none" stroke={bucket.color} strokeWidth={key === "All" ? 2.4 : 3} opacity={key === "All" ? 0.45 : 0.9} />;
        })}
        <line x1={padding} x2={width - padding} y1={y(0)} y2={y(0)} stroke="#7d8790" strokeDasharray="5 5" />
      </svg>
    </div>
  );
}

function toPath(points: number[][]) {
  return points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
}

function ToggleButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={cn("rounded-lg px-4 py-2.5 text-sm font-black transition", active ? "bg-gold text-navy shadow-sm" : "bg-cream text-navy hover:bg-gold/20")}>
      {children}
    </button>
  );
}

function ControlPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={cn("rounded-md border px-3 py-2 text-xs font-black transition", active ? "border-gold bg-gold text-navy" : "border-line bg-cream text-navy hover:border-gold")}>
      {children}
    </button>
  );
}

function GuideItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-cream p-4">
      <h4 className="font-display text-lg font-black text-navy">{title}</h4>
      <p className="mt-2">{children}</p>
    </div>
  );
}
