"use client";

import { ArrowRight, BarChart3, BookOpen, CalendarClock, Smartphone, Sparkles, Ticket } from "lucide-react";
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
        "group flex min-h-[184px] flex-col rounded-lg border bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-soft md:p-5",
        featured ? "border-gold ring-2 ring-gold/15" : "border-line"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-md bg-gold/10 px-2.5 py-1 text-xs font-black text-gold">{card.label}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cream text-navy">
          <Icon size={19} />
        </span>
      </div>
      <h2 className="mt-4 font-display text-xl font-black leading-tight text-navy md:text-2xl">{card.title}</h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{card.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-green">
        {card.cta}
        <ArrowRight size={15} />
      </span>
    </a>
  );
}
