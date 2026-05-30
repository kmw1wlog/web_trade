import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Cookie } from "lucide-react";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { conditionRecipes, getRecipeById } from "@/content/conditionRecipes";

export function generateStaticParams() {
  return conditionRecipes.map((recipe) => ({ id: recipe.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const recipe = getRecipeById(decodeURIComponent(params.id));
  return {
    title: recipe ? `${recipe.title} | 조건식 레시피` : "조건식 레시피",
    description: recipe?.summary
  };
}

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const recipe = getRecipeById(decodeURIComponent(params.id));
  if (!recipe) notFound();

  return (
    <div className="bg-cream py-10">
      <div className="mx-auto max-w-4xl px-4">
        <Link href="/recipes" className="text-sm font-bold text-green">← 조건식 목록</Link>
        <article className="mt-4 rounded-lg border border-line bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-gold/10 px-2 py-1 text-xs font-black text-gold">{recipe.category}</span>
            <span className="rounded-md bg-green/10 px-2 py-1 text-xs font-black text-green">{recipe.difficulty}</span>
            {recipe.markets.map((market) => (
              <span key={market} className="rounded-md bg-cream px-2 py-1 text-xs font-bold text-muted">{market}</span>
            ))}
          </div>
          <h1 className="mt-4 font-display text-4xl font-black leading-tight text-navy">{recipe.title}</h1>
          <p className="mt-4 text-lg leading-8 text-charcoal">{recipe.summary}</p>

          <section className="mt-7 border-t border-line pt-6">
            <h2 className="font-display text-2xl font-black text-navy">무료로 확인할 체크리스트</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {recipe.freePreview.map((item) => (
                <div key={item} className="rounded-lg bg-cream p-4 text-sm font-bold text-charcoal">{item}</div>
              ))}
            </div>
          </section>

          <section className="mt-7 rounded-lg border border-gold/30 bg-[#fff8ea] p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-black text-gold">쿠키 적용 기능</p>
                <h2 className="mt-1 font-display text-2xl font-black text-navy">TradingView/예스트레이더 적용은 쿠키 2개</h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {recipe.tradingViewHint} {recipe.yesTraderHint}
                </p>
              </div>
              <Link href={`/cookies?recipe=${recipe.id}&action=apply`} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-black text-white">
                <Cookie size={16} />
                적용 버튼 열기
              </Link>
            </div>
          </section>

          <section className="mt-7 border-t border-line pt-6">
            <h2 className="font-display text-2xl font-black text-navy">다음 행동</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Link href="/tools/indicator-finder" className="rounded-lg border border-line bg-cream p-4 text-sm font-black text-navy">
                다른 상황으로 다시 찾기
                <ArrowRight className="mt-2" size={16} />
              </Link>
              <Link href="/mock" className="rounded-lg border border-line bg-cream p-4 text-sm font-black text-navy">
                모의투자 기록에 남기기
                <ArrowRight className="mt-2" size={16} />
              </Link>
            </div>
          </section>
        </article>
        <div className="mt-8">
          <DisclosureBanner />
        </div>
      </div>
    </div>
  );
}
