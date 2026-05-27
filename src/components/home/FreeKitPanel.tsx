"use client";

import { useState } from "react";
import { FormStatusMessage } from "@/components/forms/FormStatusMessage";
import { getStoredAttribution, trackEvent } from "@/lib/analytics";

const kits = ["CVD 초보 가이드", "거래량 보는 법", "AI 조건식 예시집", "모의투자 기록표", "트레이딩뷰 지표 체크리스트"];

export function FreeKitPanel() {
  const [email, setEmail] = useState("");
  const [selectedKits, setSelectedKits] = useState<string[]>(["CVD 초보 가이드", "모의투자 기록표"]);
  const [status, setStatus] = useState<{ type: "success" | "error" | "info"; message: string }>();

  function toggle(kit: string) {
    setSelectedKits((current) => (current.includes(kit) ? current.filter((item) => item !== kit) : [...current, kit]));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "info", message: "무료 자료함에 담는 중입니다." });
    trackEvent("free_kit_click", { selectedKits });

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source: "home_free_kit",
        channel: "website",
        keyword: "free_indicator_ebook",
        interest: selectedKits.join(", "),
        metadata: { ...getStoredAttribution(), selectedKits }
      })
    });

    const data = (await response.json()) as { ok?: boolean; message?: string };
    if (!response.ok || !data.ok) {
      setStatus({ type: "error", message: data.message || "입력값을 다시 확인해 주세요." });
      return;
    }

    setStatus({ type: "success", message: "자료 신청이 접수되었습니다. 준비된 자료부터 이메일로 안내됩니다." });
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="grid gap-3 md:grid-cols-5">
        {kits.map((kit) => (
          <label key={kit} className="flex min-h-[96px] items-start gap-2 rounded-lg border border-line bg-cream p-3 text-sm font-semibold leading-6 text-charcoal">
            <input type="checkbox" checked={selectedKits.includes(kit)} onChange={() => toggle(kit)} className="mt-1" />
            {kit}
          </label>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
        <input className="rounded-lg border border-line bg-white px-4 py-3 text-sm outline-none focus:border-gold" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="이메일" required />
        <button className="rounded-lg bg-navy px-5 py-3 text-sm font-black text-white transition hover:bg-green" type="submit">
          무료 자료함에 담기
        </button>
      </div>
      <div className="mt-3">
        <FormStatusMessage status={status} />
      </div>
    </form>
  );
}
