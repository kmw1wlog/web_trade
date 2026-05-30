import type { Metadata } from "next";
import { RecipeBrowser } from "@/components/recipes/RecipeBrowser";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { conditionRecipes } from "@/content/conditionRecipes";

export const metadata: Metadata = {
  title: "조건식 레시피 80개 | 투자도구 허브",
  description: "캔들, 거래량, 국장 단타 전략, 보조지표 기반 조건식 레시피 목록입니다."
};

export default function RecipesPage() {
  return (
    <div className="bg-cream py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-7">
          <p className="text-sm font-black text-gold">조건식/지표 DB</p>
          <h1 className="mt-2 font-display text-4xl font-black text-navy">조건식 레시피 {conditionRecipes.length}개</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
            기술적 분석 모식도와 국장 단타에서 자주 쓰이는 상황을 기준으로, 무료 요약과 쿠키 적용 버튼을 나눠둔 레시피 목록입니다.
          </p>
        </div>
        <RecipeBrowser />
        <div className="mt-8">
          <DisclosureBanner />
        </div>
      </div>
    </div>
  );
}
