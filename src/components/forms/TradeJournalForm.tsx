"use client";

import { useState } from "react";
import { FormStatusMessage } from "@/components/forms/FormStatusMessage";
import { trackEvent } from "@/lib/analytics";

export function TradeJournalForm() {
  const [status, setStatus] = useState<{ type: "success" | "error" | "info"; message: string }>();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "info", message: "모의투자 기록을 저장하는 중입니다." });
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form);

    const response = await fetch("/api/mock-trades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = (await response.json()) as { ok?: boolean; message?: string };

    if (!response.ok || !data.ok) {
      setStatus({ type: "error", message: data.message || "필수 항목을 입력해 주세요." });
      return;
    }

    trackEvent("mock_trade_submit");
    setStatus({ type: "success", message: data.message || "모의투자 기록이 저장되었습니다." });
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-ink/10 bg-white/75 p-5">
      <input name="email" type="email" className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="이메일 선택 입력" />
      <input name="symbol" required className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="종목명" />
      <input name="tradeDate" type="date" className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" />
      <select name="direction" className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" defaultValue="watch">
        <option value="watch">관찰</option>
        <option value="long">상승 관찰</option>
        <option value="short">하락 관찰</option>
      </select>
      <input name="conditionName" className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="조건식" />
      <textarea name="entryReason" required className="min-h-24 rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="진입근거" />
      <input name="stopRule" className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="손절기준" />
      <input name="targetRule" className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="익절기준" />
      <input name="result" className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="결과" />
      <textarea name="review" className="min-h-24 rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="복기" />
      <input name="emotion" className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="감정/상태" />
      <button className="rounded-2xl bg-ink px-4 py-3 text-sm font-bold text-paper" type="submit">
        기록 저장
      </button>
      <FormStatusMessage status={status} />
    </form>
  );
}
