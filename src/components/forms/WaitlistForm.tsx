"use client";

import { useState } from "react";
import { FormStatusMessage } from "@/components/forms/FormStatusMessage";
import { getStoredAttribution, trackEvent } from "@/lib/analytics";

export function WaitlistForm({
  type,
  options,
  source,
  persona
}: {
  type: "app" | "course" | "mock" | "api" | "crypto" | "premium";
  options: readonly string[];
  source?: string;
  persona?: string;
}) {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [status, setStatus] = useState<{ type: "success" | "error" | "info"; message: string }>();

  function toggle(option: string) {
    setSelectedOptions((current) => (current.includes(option) ? current.filter((item) => item !== option) : [...current, option]));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "info", message: "대기 신청을 접수하는 중입니다." });

    const response = await fetch("/api/waitlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        type,
        selectedOptions,
        source,
        persona,
        metadata: { ...getStoredAttribution(), interest }
      })
    });
    const data = (await response.json()) as { ok?: boolean; message?: string };

    if (!response.ok || !data.ok) {
      setStatus({ type: "error", message: data.message || "입력값을 다시 확인해 주세요." });
      return;
    }

    trackEvent(type === "crypto" ? "crypto_waitlist_submit" : "waitlist_submit", { type, selectedOptions });
    setStatus({ type: "success", message: data.message || "대기 신청이 접수되었습니다." });
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-ink/10 bg-white/75 p-5">
      <div className="grid gap-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-paper/60 px-4 py-3 text-sm">
            <input type="checkbox" checked={selectedOptions.includes(option)} onChange={() => toggle(option)} />
            {option}
          </label>
        ))}
      </div>
      <input
        className="rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-moss"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="이메일"
        required
      />
      <input
        className="rounded-2xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-moss"
        value={interest}
        onChange={(event) => setInterest(event.target.value)}
        placeholder="관심사 선택 입력"
      />
      <button className="rounded-2xl bg-ink px-4 py-3 text-sm font-bold text-paper transition hover:bg-moss" type="submit">
        사전예약 신청
      </button>
      <FormStatusMessage status={status} />
    </form>
  );
}
