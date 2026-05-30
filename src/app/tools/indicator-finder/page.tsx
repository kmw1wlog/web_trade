import type { Metadata } from "next";
import Link from "next/link";
import { IndicatorFinder } from "@/components/tools/IndicatorFinder";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";

export const metadata: Metadata = {
  title: "지표 찾기 시작 | 투자도구 허브",
  description: "상황을 고르면 조건식과 지표 레시피를 추천받는 무료 문답 도구입니다."
};

export default function IndicatorFinderPage() {
  return (
    <div className="bg-cream py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black text-gold">바로 써보는 기능</p>
            <h1 className="mt-2 font-display text-4xl font-black leading-tight text-navy">지표/조건식 찾기</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              상따, 종베, 시초가, 눌림목, 거래량 급증처럼 사용자가 실제로 궁금해하는 상황에서 출발합니다.
            </p>
          </div>
          <Link href="/recipes" className="rounded-lg border border-navy bg-white px-4 py-3 text-sm font-black text-navy">
            전체 80개 레시피
          </Link>
        </div>
        <IndicatorFinder />
        <div className="mt-8">
          <DisclosureBanner />
        </div>
      </div>
    </div>
  );
}
