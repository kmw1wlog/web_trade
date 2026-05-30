"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookMarked, Cookie, Search } from "lucide-react";
import { findRecipes, recipeIntents, type ConditionRecipe } from "@/content/conditionRecipes";
import { saveBenefitToWallet } from "@/lib/benefitWallet";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const quickIntents = ["거래량 급증", "시초가", "상따", "종베", "눌림목", "전고점 돌파", "짝꿍매매", "과열 회피"];

export function IndicatorFinder() {
  const [intent, setIntent] = useState("거래량 급증");
  const [query, setQuery] = useState("");
  const results = useMemo(() => findRecipes({ intent, query, limit: 5 }), [intent, query]);

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackEvent("condition_query_submitted", { intent, query, resultsCount: results.length });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <aside className="rounded-lg border border-line bg-white p-5 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">FREE START</p>
        <h2 className="mt-2 font-display text-3xl font-black text-navy">지표 찾기 시작</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          지표 이름을 몰라도 됩니다. 지금 보고 싶은 상황을 고르면 조건식/지표 묶음을 먼저 추천합니다.
        </p>

        <form onSubmit={submitSearch} className="mt-5 grid gap-3">
          <label className="text-sm font-black text-charcoal" htmlFor="indicator-query">
            궁금한 상황
          </label>
          <div className="flex rounded-lg border border-line bg-cream px-3 py-2 focus-within:border-gold">
            <Search className="mt-1 text-muted" size={18} />
            <input
              id="indicator-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="예: 거래량, 전고점, 눌림목"
              className="min-w-0 flex-1 bg-transparent px-2 py-1 text-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {quickIntents.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setIntent(item);
                  trackEvent("indicator_finder_started", { intent: item, source: "quick_intent" });
                }}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-bold transition",
                  intent === item ? "border-navy bg-navy text-white" : "border-line bg-white text-navy hover:border-gold"
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-green px-4 py-3 text-sm font-black text-white">
            추천 조건식 보기
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-5 rounded-lg bg-cream p-4 text-sm leading-6 text-muted">
          무료로는 요약과 체크리스트를 봅니다. TradingView/예스트레이더 적용 버튼은 쿠키 2개 안내 후 데모 결제창으로 이어집니다.
        </div>
      </aside>

      <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black text-gold">추천 결과</p>
            <h3 className="font-display text-3xl font-black text-navy">{intent} 조건식</h3>
          </div>
          <Link href="/recipes" className="inline-flex items-center gap-2 text-sm font-black text-green">
            전체 80개 보기
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-5 grid gap-3" data-testid="indicator-results">
          {results.length > 0 ? (
            results.map((recipe) => <FinderRecipeCard key={recipe.id} recipe={recipe} />)
          ) : (
            <div className="rounded-lg border border-dashed border-line bg-cream p-6 text-sm text-muted">
              조건을 조금 넓혀보세요. 예: 거래량, 눌림목, 시초가
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function FinderRecipeCard({ recipe }: { recipe: ConditionRecipe }) {
  return (
    <article className="rounded-lg border border-line bg-cream p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-white px-2 py-1 text-xs font-black text-gold">{recipe.category}</span>
            <span className="rounded-md bg-white px-2 py-1 text-xs font-black text-green">{recipe.difficulty}</span>
          </div>
          <h4 className="mt-3 font-display text-2xl font-black text-navy">{recipe.title}</h4>
          <p className="mt-2 text-sm leading-6 text-muted">{recipe.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {recipe.freePreview.map((item) => (
              <span key={item} className="rounded-full border border-line bg-white px-3 py-1 text-xs font-bold text-charcoal">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="grid shrink-0 gap-2 md:w-44">
          <Link
            href={`/recipes/${recipe.id}`}
            onClick={() => {
              saveBenefitToWallet({ id: "web-tools", title: recipe.title, href: `/recipes/${recipe.id}` });
              trackEvent("recipe_saved", { recipeId: recipe.id, title: recipe.title, source: "indicator_finder" });
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-3 py-2 text-sm font-black text-white"
          >
            <BookMarked size={16} />
            상세 보기
          </Link>
          <Link
            href={`/cookies?recipe=${recipe.id}&action=apply`}
            onClick={() => trackEvent("apply_button_clicked", { recipeId: recipe.id, platform: "apply_options" })}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-navy bg-white px-3 py-2 text-sm font-black text-navy"
          >
            <Cookie size={16} />
            적용 버튼
          </Link>
        </div>
      </div>
    </article>
  );
}

export const finderIntentOptions = recipeIntents;
