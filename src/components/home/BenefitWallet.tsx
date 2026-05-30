"use client";

import { useEffect, useState } from "react";
import { Clock3, Gift, RotateCcw, Ticket } from "lucide-react";
import { BENEFIT_WALLET_KEY, getCouponDaysLeft, readBenefitWallet, type BenefitWallet as BenefitWalletState } from "@/lib/benefitWallet";
import { trackEvent } from "@/lib/analytics";

export function BenefitWallet() {
  const [wallet, setWallet] = useState<BenefitWalletState>(() => ({
    benefits: [],
    updatedAt: new Date().toISOString()
  }));

  useEffect(() => {
    function syncWallet() {
      setWallet(readBenefitWallet());
    }

    syncWallet();
    window.addEventListener("benefit-wallet-change", syncWallet);
    window.addEventListener("storage", syncWallet);
    trackEvent("coupon_wallet_view", { benefitsCount: readBenefitWallet().benefits.length });

    return () => {
      window.removeEventListener("benefit-wallet-change", syncWallet);
      window.removeEventListener("storage", syncWallet);
    };
  }, []);

  const daysLeft = getCouponDaysLeft(wallet.coupon);
  const hasBenefits = wallet.benefits.length > 0;

  return (
    <aside data-testid="benefit-wallet" className="rounded-lg border border-white/75 bg-white p-4 shadow-[0_16px_36px_rgba(21,23,26,0.08)] md:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">MY WALLET</p>
          <h2 className="mt-1 font-display text-2xl font-black text-navy">내 혜택 보관함</h2>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cream text-green">
          <Gift size={22} />
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-cream p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-muted">
            <Ticket size={14} />
            쿠폰
          </div>
          <p className="mt-1 font-display text-2xl font-black text-navy" data-testid="wallet-coupon-days">
            {daysLeft === null ? "-" : `${daysLeft}일`}
          </p>
        </div>
        <div className="rounded-lg bg-cream p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-muted">
            <Clock3 size={14} />
            남은 횟수
          </div>
          <p className="mt-1 font-display text-2xl font-black text-navy" data-testid="wallet-coupon-uses">
            {wallet.coupon ? `${wallet.coupon.usesLeft}회` : "-"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-black text-charcoal">담아둔 항목</p>
        {hasBenefits ? (
          <div className="mt-3 grid gap-2" data-testid="wallet-benefit-list">
            {wallet.benefits.slice(0, 4).map((benefit) => (
              <a
                key={benefit.id}
                href={benefit.href}
                onClick={() => trackEvent("wallet_open", { id: benefit.id, title: benefit.title })}
                className="flex items-center justify-between rounded-lg border border-line bg-white px-3 py-2 text-sm font-bold text-navy hover:border-gold"
              >
                <span>{benefit.title}</span>
                <span className="text-xs text-green">열기</span>
              </a>
            ))}
          </div>
        ) : (
          <p className="mt-3 rounded-lg border border-dashed border-line bg-cream px-3 py-4 text-sm leading-6 text-muted" data-testid="wallet-empty">
            첫 화면 카드나 쿠폰 신청을 누르면 여기에 저장됩니다.
          </p>
        )}
      </div>

      {hasBenefits ? (
        <button
          type="button"
          onClick={() => {
            window.localStorage.removeItem(BENEFIT_WALLET_KEY);
            window.dispatchEvent(new CustomEvent("benefit-wallet-change"));
            trackEvent("wallet_open", { action: "reset" });
          }}
          className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-navy"
        >
          <RotateCcw size={14} />
          보관함 초기화
        </button>
      ) : null}
    </aside>
  );
}
