"use client";

import { useState } from "react";
import { FormStatusMessage } from "@/components/forms/FormStatusMessage";
import { getStoredAttribution, trackEvent } from "@/lib/analytics";

export function LeadCaptureForm({
  interest,
  keyword,
  compact = false
}: {
  interest: string;
  keyword?: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [instagramUsername, setInstagramUsername] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error" | "info"; message: string }>();
  const [resourceReady, setResourceReady] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "info", message: "자료 신청을 접수하는 중입니다." });

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        instagramUsername,
        source: "website",
        channel: "free_resource",
        keyword,
        interest,
        metadata: getStoredAttribution()
      })
    });

    const data = (await response.json()) as { ok?: boolean; message?: string };
    if (!response.ok || !data.ok) {
      setStatus({ type: "error", message: data.message || "입력값을 다시 확인해 주세요." });
      return;
    }

    trackEvent("lead_submit", { interest, keyword });
    setResourceReady(true);
    setStatus({ type: "success", message: data.message || "신청이 접수되었습니다. 아래에서 자료 링크 상태를 확인하세요." });
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input
        className="rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-moss"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="이메일"
        required
      />
      {!compact ? (
        <input
          className="rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-moss"
          value={instagramUsername}
          onChange={(event) => setInstagramUsername(event.target.value)}
          placeholder="인스타그램 아이디 선택 입력"
        />
      ) : null}
      <button className="rounded-2xl bg-ink px-4 py-3 text-sm font-bold text-paper transition hover:bg-moss" type="submit">
        자료 링크 보기
      </button>
      <FormStatusMessage status={status} />
      {resourceReady ? <p className="rounded-2xl bg-oat/70 px-4 py-3 text-sm text-ink">PDF 업로드 전 MVP 상태입니다. 실제 자료 링크는 오픈 시 이메일로 안내됩니다.</p> : null}
    </form>
  );
}
