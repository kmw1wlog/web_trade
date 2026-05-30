import type { Metadata } from "next";
import Link from "next/link";
import { Check, Cookie } from "lucide-react";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";

export const metadata: Metadata = {
  title: "쿠키 충전 데모 | 투자도구 허브",
  description: "조건식 상세 적용 기능에 사용하는 쿠키 충전 데모 페이지입니다."
};

const cookiePacks = [
  { name: "10쿠키", price: "5,000원", discount: "정가", cookies: 10 },
  { name: "50쿠키", price: "23,750원", discount: "5% 할인", cookies: 50 },
  { name: "100쿠키", price: "45,000원", discount: "10% 할인", cookies: 100 }
];

export default function CookiesPage({ searchParams }: { searchParams: { recipe?: string; action?: string } }) {
  return (
    <div className="bg-cream py-10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black text-gold">데모 결제창</p>
              <h1 className="mt-2 font-display text-4xl font-black text-navy">쿠키 충전</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                TradingView/예스트레이더 적용, 상세 조건, PDF export 같은 실사용 기능은 쿠키로 열어보는 구조를 검증합니다.
              </p>
            </div>
            <div className="rounded-lg bg-cream p-4 text-sm font-bold text-charcoal">
              적용 기능 1회: 쿠키 2개
            </div>
          </div>

          {searchParams.recipe ? (
            <div className="mt-5 rounded-lg border border-gold/30 bg-[#fff8ea] p-4 text-sm leading-6 text-charcoal">
              선택한 레시피의 적용 버튼을 열기 위해 쿠키가 필요합니다. 현재는 실제 결제 전 UX 검증용 데모입니다.
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {cookiePacks.map((pack) => (
              <div key={pack.name} className="rounded-lg border border-line bg-cream p-5">
                <div className="flex items-center justify-between">
                  <Cookie className="text-gold" size={24} />
                  <span className="rounded-md bg-white px-2 py-1 text-xs font-black text-green">{pack.discount}</span>
                </div>
                <h2 className="mt-4 font-display text-3xl font-black text-navy">{pack.name}</h2>
                <p className="mt-1 text-2xl font-black text-charcoal">{pack.price}</p>
                <ul className="mt-4 grid gap-2 text-sm text-muted">
                  <li className="flex gap-2"><Check size={16} className="text-green" /> 적용 버튼 {Math.floor(pack.cookies / 2)}회 분량</li>
                  <li className="flex gap-2"><Check size={16} className="text-green" /> 조건식 상세 보기</li>
                  <li className="flex gap-2"><Check size={16} className="text-green" /> 데모 결제 UX</li>
                </ul>
                <button className="mt-5 w-full rounded-lg bg-navy px-4 py-3 text-sm font-black text-white">
                  데모 결제창 보기
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/tools/indicator-finder" className="rounded-lg border border-navy bg-white px-4 py-3 text-sm font-black text-navy">
              지표 다시 찾기
            </Link>
            <Link href="/recipes" className="rounded-lg bg-green px-4 py-3 text-sm font-black text-white">
              조건식 목록 보기
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <DisclosureBanner />
        </div>
      </div>
    </div>
  );
}
