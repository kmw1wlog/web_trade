import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, LockKeyhole } from "lucide-react";
import { EbookLeadForm } from "@/components/ebooks/EbookLeadForm";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { ebooks } from "@/content/ebooks";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "무료 지표·전자책 자료함 | 투자도구 허브",
  description: "CVD 초보 가이드, 거래량 조건식 입문, TradingView 지표 체크리스트를 무료로 담아두세요."
};

const accentClass = {
  gold: "from-[#f7d982] to-[#8a6724]",
  green: "from-[#77b49e] to-[#163d34]",
  navy: "from-[#31415f] to-[#0d1424]",
  rose: "from-[#d87979] to-[#421b24]"
} as const;

export default function EbooksPage() {
  return (
    <div className="bg-cream">
      <section className="border-b border-line bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-black text-gold">무료 지표·전자책</p>
          <h1 className="mt-3 font-display text-5xl font-black leading-tight text-navy">먼저 무료판을 담아두고, 필요한 것만 깊게 보세요.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            CVD, 거래량, 조건식, 차트 세팅 자료를 진열장처럼 모았습니다. 첫 방문자는 무료 전자책을 받고, 심화판은 나중에 선택하면 됩니다.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-testid="ebook-shelf">
            {ebooks.map((ebook) => (
              <article key={ebook.slug} className="group rounded-lg border border-line bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <div className={cn("flex aspect-[4/5] flex-col justify-between rounded-md bg-gradient-to-br p-5 text-white", accentClass[ebook.accent])}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black">{ebook.priceLabel}</span>
                    {ebook.type === "paid" ? <LockKeyhole size={19} /> : <BookOpen size={20} />}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">ROUTINE NOTE</p>
                    <h2 className="mt-3 font-display text-3xl font-black leading-tight">{ebook.title}</h2>
                    <p className="mt-3 text-sm font-semibold text-white/80">{ebook.subtitle}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs font-black text-gold">{ebook.audience}</p>
                <ul className="mt-3 grid gap-2 text-sm text-muted">
                  {ebook.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-md bg-cream px-3 py-2">{bullet}</li>
                  ))}
                </ul>
                <Link href={ebook.href} className={cn("mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-black", ebook.type === "paid" ? "bg-navy text-white" : "bg-green text-white")}>
                  {ebook.cta}
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <EbookLeadForm />
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <DisclosureBanner />
        </div>
      </section>
    </div>
  );
}
