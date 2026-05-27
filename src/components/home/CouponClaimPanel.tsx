"use client";

import { useState } from "react";
import { FormStatusMessage } from "@/components/forms/FormStatusMessage";
import { getStoredAttribution, trackEvent } from "@/lib/analytics";

const benefits = ["무료자료", "앱베타", "사전예약", "프리미엄"];

export function CouponClaimPanel() {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [instagramUsername, setInstagramUsername] = useState("");
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>(["무료자료"]);
  const [status, setStatus] = useState<{ type: "success" | "error" | "info"; message: string }>();

  function toggle(benefit: string) {
    setSelectedBenefits((current) => (current.includes(benefit) ? current.filter((item) => item !== benefit) : [...current, benefit]));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "info", message: "무료 쿠폰을 보관하는 중입니다." });
    trackEvent("coupon_claim_click", { selectedBenefits });

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        instagramUsername,
        source: "home_coupon",
        channel: "website",
        keyword: "3day_10use_coupon",
        interest,
        metadata: {
          ...getStoredAttribution(),
          couponDays: 3,
          couponUses: 10,
          selectedBenefits
        }
      })
    });

    const data = (await response.json()) as { ok?: boolean; message?: string };
    if (!response.ok || !data.ok) {
      setStatus({ type: "error", message: data.message || "입력값을 다시 확인해 주세요." });
      return;
    }

    setStatus({ type: "success", message: "쿠폰이 보관되었습니다. 무료자료와 기능 체험 순서를 아래에서 확인하세요." });
  }

  return (
    <div className="grid gap-6 rounded-lg border border-line bg-white p-5 shadow-sm lg:grid-cols-[1fr_380px] lg:p-7">
      <div>
        <p className="text-sm font-black text-gold">3일 무료 쿠폰</p>
        <h2 className="mt-3 font-display text-3xl font-black leading-tight text-navy md:text-4xl">3일 무료 10회권을 먼저 받아두세요.</h2>
        <p className="mt-4 text-base leading-7 text-muted">
          지금 전부 쓰지 않아도 됩니다. 쿠폰을 보관해두면 만료 전 알림과 추천 사용 순서를 안내합니다.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-cream p-4">
            <p className="text-xs font-bold text-muted">남은 기간</p>
            <p className="mt-1 font-display text-3xl font-black text-navy">3일</p>
          </div>
          <div className="rounded-lg bg-cream p-4">
            <p className="text-xs font-bold text-muted">이용 가능 횟수</p>
            <p className="mt-1 font-display text-3xl font-black text-navy">10회</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-sm font-black text-charcoal">추천 사용 순서</p>
          <ol className="mt-3 grid gap-2 text-sm leading-6 text-muted">
            {["CVD 지표 1회 확인", "무료 전자책 저장", "자연어 조건식 입력", "앱 베타/사전예약 확인"].map((item, index) => (
              <li key={item} className="rounded-lg border border-line bg-white px-3 py-2">
                {index + 1}. {item}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <form onSubmit={onSubmit} className="grid content-start gap-3 rounded-lg bg-cream p-4">
        <input className="rounded-lg border border-line bg-white px-4 py-3 text-sm outline-none focus:border-gold" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="이메일" required />
        <input className="rounded-lg border border-line bg-white px-4 py-3 text-sm outline-none focus:border-gold" value={instagramUsername} onChange={(event) => setInstagramUsername(event.target.value)} placeholder="인스타 아이디 선택 입력" />
        <input className="rounded-lg border border-line bg-white px-4 py-3 text-sm outline-none focus:border-gold" value={interest} onChange={(event) => setInterest(event.target.value)} placeholder="관심사 선택 입력" />
        <div className="grid grid-cols-2 gap-2">
          {benefits.map((benefit) => (
            <label key={benefit} className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-3 text-sm font-semibold text-charcoal">
              <input type="checkbox" checked={selectedBenefits.includes(benefit)} onChange={() => toggle(benefit)} />
              {benefit}
            </label>
          ))}
        </div>
        <button className="rounded-lg bg-navy px-4 py-3 text-sm font-black text-white transition hover:bg-green" type="submit">
          무료 쿠폰 보관하기
        </button>
        <FormStatusMessage status={status} />
      </form>
    </div>
  );
}
