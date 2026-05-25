"use client";

import { useState } from "react";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { FormStatusMessage } from "@/components/forms/FormStatusMessage";
import { trackEvent } from "@/lib/analytics";

export function CheckoutButton({ productSlug }: { productSlug: string }) {
  const [email, setEmail] = useState("");
  const [fallback, setFallback] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | "info"; message: string }>();

  async function startCheckout() {
    setStatus({ type: "info", message: "결제 페이지를 준비하는 중입니다." });
    trackEvent("checkout_start", { productSlug });

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productSlug, email, source: "store" })
    });
    const data = (await response.json()) as { checkoutUrl?: string | null; fallback?: boolean; message?: string };

    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
      return;
    }

    setFallback(true);
    setStatus({
      type: "info",
      message: data.message || "결제 준비 중입니다. 이메일을 남기면 오픈 시 알려드릴게요."
    });
  }

  return (
    <div className="grid gap-3 rounded-3xl border border-ink/10 bg-white/75 p-5">
      <input
        className="rounded-2xl border border-ink/15 px-4 py-3 text-sm"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="결제 안내 받을 이메일 선택 입력"
      />
      <button onClick={startCheckout} className="rounded-2xl bg-clay px-5 py-3 text-sm font-bold text-paper" type="button">
        결제 또는 대기 신청
      </button>
      <FormStatusMessage status={status} />
      {fallback ? <WaitlistForm type="premium" options={["프리미엄 글 알림", "전자책 알림", "패스 오픈 알림"]} source={productSlug} /> : null}
    </div>
  );
}
