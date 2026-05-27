"use client";

import { ArrowRight, BarChart3, BookOpen, CalendarClock, Smartphone, Sparkles, Ticket, type LucideIcon } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const icons = {
  coupon: Ticket,
  "free-kit": BookOpen,
  "premium-trial": Sparkles,
  "web-tools": BarChart3,
  "app-beta": Smartphone,
  preorder: CalendarClock
} as const;

export type BenefitCardItem = {
  id: keyof typeof icons;
  label: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  eventName: string;
};

export function BenefitCard({ card, featured = false }: { card: BenefitCardItem; featured?: boolean }) {
  const Icon = icons[card.id];

  function onClick() {
    trackEvent("home_benefit_card_click", { id: card.id, title: card.title });
    trackEvent(card.eventName, { id: card.id, title: card.title });
  }

  return (
    <a
      href={card.href}
      onClick={onClick}
      className={cn(
        "group flex min-h-[272px] flex-col rounded-lg border bg-white p-4 text-left shadow-[0_18px_38px_rgba(21,23,26,0.08)] transition hover:-translate-y-1 hover:shadow-soft md:min-h-[318px] md:p-5",
        featured ? "border-gold ring-2 ring-gold/15" : "border-line"
      )}
    >
      <BenefitPreview id={card.id} Icon={Icon} />
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="rounded-md bg-gold/10 px-2.5 py-1 text-xs font-black text-gold">{card.label}</span>
        {featured ? <span className="text-xs font-black text-green">먼저 받기</span> : null}
      </div>
      <h2 className="mt-3 font-display text-xl font-black leading-tight text-navy md:text-2xl">{card.title}</h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{card.description}</p>
      <span className="mt-5 inline-flex items-center justify-center gap-1 rounded-full bg-navy px-4 py-2.5 text-sm font-black text-white transition group-hover:bg-green">
        {card.cta}
        <ArrowRight size={15} />
      </span>
    </a>
  );
}

function BenefitPreview({ id, Icon }: { id: BenefitCardItem["id"]; Icon: LucideIcon }) {
  if (id === "coupon") {
    return (
      <div className="relative overflow-hidden rounded-lg border border-gold/30 bg-[#fbf4dc] p-4">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/20" />
        <div className="flex items-start justify-between">
          <Icon className="text-gold" size={28} />
          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-navy">3일</span>
        </div>
        <p className="mt-8 font-display text-3xl font-black text-navy">10회권</p>
        <p className="mt-1 text-xs font-bold text-muted">보관 후 다시 확인</p>
      </div>
    );
  }

  if (id === "free-kit") {
    return (
      <div className="rounded-lg border border-line bg-cream p-4">
        <div className="flex items-center gap-2">
          <Icon className="text-green" size={24} />
          <span className="h-2 flex-1 rounded-full bg-line" />
        </div>
        <div className="mt-5 grid gap-2">
          <span className="h-3 w-4/5 rounded-full bg-gold/50" />
          <span className="h-3 w-3/5 rounded-full bg-green/25" />
          <span className="h-3 w-5/6 rounded-full bg-line" />
        </div>
      </div>
    );
  }

  if (id === "web-tools") {
    return (
      <div className="rounded-lg border border-line bg-white p-4">
        <div className="flex items-center justify-between">
          <Icon className="text-green" size={24} />
          <span className="text-xs font-black text-gold">DEMO</span>
        </div>
        <div className="mt-5 flex h-14 items-end gap-1.5">
          {[32, 46, 28, 58, 42, 68, 50].map((height) => (
            <span key={height} className="flex-1 rounded-t bg-green/60" style={{ height }} />
          ))}
        </div>
      </div>
    );
  }

  if (id === "app-beta") {
    return (
      <div className="flex justify-center rounded-lg border border-line bg-cream p-3">
        <div className="h-24 w-14 rounded-[18px] border-4 border-navy bg-white p-1">
          <div className="h-full rounded-xl bg-gradient-to-b from-gold/25 to-green/20 p-1.5">
            <span className="block h-2 w-7 rounded-full bg-navy/30" />
            <span className="mt-7 block h-5 rounded-md bg-white/80" />
          </div>
        </div>
      </div>
    );
  }

  if (id === "preorder") {
    return (
      <div className="rounded-lg border border-line bg-cream p-4">
        <div className="flex items-center justify-between">
          <Icon className="text-gold" size={24} />
          <span className="text-xs font-black text-navy">OPEN</span>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-1.5">
          {Array.from({ length: 12 }).map((_, index) => (
            <span key={index} className={cn("h-5 rounded", index % 3 === 0 ? "bg-gold/50" : "bg-white")} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gold/25 bg-[#fff8ea] p-4">
      <div className="flex items-center justify-between">
        <Icon className="text-gold" size={24} />
        <span className="rounded-full bg-white px-2 py-1 text-xs font-black text-gold">PREMIUM</span>
      </div>
      <div className="mt-6 rounded-lg bg-white p-3 shadow-sm">
        <span className="block h-2 w-20 rounded-full bg-gold/60" />
        <span className="mt-3 block h-2 w-28 rounded-full bg-line" />
        <span className="mt-2 block h-2 w-16 rounded-full bg-green/30" />
      </div>
    </div>
  );
}
