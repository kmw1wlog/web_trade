"use client";

import { useState } from "react";
import { FormStatusMessage } from "@/components/forms/FormStatusMessage";
import { trackEvent } from "@/lib/analytics";

export function PartnerInquiryForm() {
  const [status, setStatus] = useState<{ type: "success" | "error" | "info"; message: string }>();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "info", message: "문의 내용을 보내는 중입니다." });
    const form = new FormData(event.currentTarget);

    const response = await fetch("/api/partner-inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form))
    });
    const data = (await response.json()) as { ok?: boolean; message?: string };

    if (!response.ok || !data.ok) {
      setStatus({ type: "error", message: data.message || "입력값을 다시 확인해 주세요." });
      return;
    }

    trackEvent("partner_inquiry_submit");
    setStatus({ type: "success", message: data.message || "제휴 문의가 접수되었습니다." });
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-ink/10 bg-white/75 p-5">
      <input name="name" className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="이름" />
      <input name="email" type="email" required className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="이메일" />
      <input name="company" className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="회사/채널명" />
      <select name="category" className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" defaultValue="MTS">
        {["MTS", "투자앱", "데이터업체", "교육업체", "인플루언서", "커뮤니티"].map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <textarea name="message" required minLength={10} className="min-h-36 rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="문의 내용을 10자 이상 적어 주세요." />
      <button className="rounded-2xl bg-ink px-4 py-3 text-sm font-bold text-paper" type="submit">
        문의 보내기
      </button>
      <FormStatusMessage status={status} />
    </form>
  );
}
