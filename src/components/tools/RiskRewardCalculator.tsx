"use client";

import { useMemo, useState } from "react";
import { calculateRiskReward } from "@/lib/risk";

export function RiskRewardCalculator() {
  const [entry, setEntry] = useState("10000");
  const [stop, setStop] = useState("9500");
  const [target, setTarget] = useState("11000");
  const result = useMemo(() => calculateRiskReward({ entry: Number(entry), stop: Number(stop), target: Number(target) }), [entry, stop, target]);

  return (
    <div className="grid gap-5 rounded-3xl border border-ink/10 bg-white/75 p-5">
      <p className="rounded-2xl bg-oat/70 px-4 py-3 text-sm text-ink">교육/모의투자용 계산기입니다. 실제 투자 판단을 대신하지 않습니다.</p>
      <div className="grid gap-3 md:grid-cols-3">
        <input value={entry} onChange={(event) => setEntry(event.target.value)} type="number" className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="진입가" />
        <input value={stop} onChange={(event) => setStop(event.target.value)} type="number" className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="손절가" />
        <input value={target} onChange={(event) => setTarget(event.target.value)} type="number" className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="익절가" />
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Result label="손실률" value={`${result.riskPercent}%`} />
        <Result label="수익률" value={`${result.rewardPercent}%`} />
        <Result label="손익비" value={`${result.rr}`} />
      </div>
    </div>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-paper p-4">
      <p className="text-sm text-ink/60">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold text-ink">{value}</p>
    </div>
  );
}
