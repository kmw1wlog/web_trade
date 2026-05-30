"use client";

import { useState } from "react";
import { FormStatusMessage } from "@/components/forms/FormStatusMessage";
import { getStoredAttribution, trackEvent } from "@/lib/analytics";

const defaultSelections = ["CVD 초보 가이드", "거래량 조건식 입문", "TradingView 지표 체크리스트"];

export function EbookLeadForm() {
  const [email, setEmail] = useState("");
  const [instagramUsername, setInstagramUsername] = useState("");
  const [selected, setSelected] = useState(defaultSelections);
  const [status, setStatus] = useState<{ type: "success" | "error" | "info"; message: string }>();

  function toggle(item: string) {
    setSelected((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "info", message: "무료 전자책을 자료함에 담는 중입니다." });
    trackEvent("free_ebook_claim_click", { selected });

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        instagramUsername,
        source: "ebook_shelf",
        channel: "website",
        keyword: "free_ebook_pack",
        interest: selected.join(", "),
        metadata: { ...getStoredAttribution(), selectedEbooks: selected }
      })
    });

    const data = (await response.json()) as { ok?: boolean; message?: string };
    if (!response.ok || !data.ok) {
      setStatus({ type: "error", message: data.message || "입력값을 다시 확인해 주세요." });
      return;
    }

    setStatus({ type: "success", message: "무료 전자책 신청이 접수되었습니다. 준비된 자료부터 이메일로 안내됩니다." });
  }

  return (
    <form id="free-ebook-form" onSubmit={onSubmit} className="scroll-mt-24 rounded-lg border border-line bg-white p-5 shadow-sm">
      <p className="text-sm font-black text-gold">무료 전자책 자료함</p>
      <h2 className="mt-2 font-display text-3xl font-black text-navy">처음 방문자는 무료판부터 담아두세요</h2>
      <p className="mt-2 text-sm leading-6 text-muted">유료 전자책으로 바로 가지 않아도 됩니다. CVD, 거래량, 차트 세팅 기본 자료를 먼저 받아보고 필요한 사람만 심화판으로 넘어갑니다.</p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {defaultSelections.map((item) => (
          <label key={item} className="flex gap-2 rounded-lg border border-line bg-cream p-4 text-sm font-bold text-charcoal">
            <input type="checkbox" checked={selected.includes(item)} onChange={() => toggle(item)} className="mt-1" />
            {item}
          </label>
        ))}
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <input className="rounded-lg border border-line bg-white px-4 py-3 text-sm outline-none focus:border-gold" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="이메일" required />
        <input className="rounded-lg border border-line bg-white px-4 py-3 text-sm outline-none focus:border-gold" value={instagramUsername} onChange={(event) => setInstagramUsername(event.target.value)} placeholder="인스타 아이디 선택 입력" />
        <button className="rounded-lg bg-navy px-5 py-3 text-sm font-black text-white transition hover:bg-green" type="submit">
          무료 전자책 담기
        </button>
      </div>
      <div className="mt-3">
        <FormStatusMessage status={status} />
      </div>
    </form>
  );
}
