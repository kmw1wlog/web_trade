"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { findRecipes, recipeCategories, recipeIntents } from "@/content/conditionRecipes";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function RecipeBrowser() {
  const [category, setCategory] = useState("");
  const [intent, setIntent] = useState("");
  const [query, setQuery] = useState("");
  const recipes = useMemo(() => findRecipes({ category, intent, query }), [category, intent, query]);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="rounded-lg border border-line bg-white p-4 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">FILTER</p>
        <h2 className="mt-2 font-display text-2xl font-black text-navy">조건식 80개</h2>
        <div className="mt-4 flex rounded-lg border border-line bg-cream px-3 py-2 focus-within:border-gold">
          <Search className="mt-1 text-muted" size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="검색" className="min-w-0 flex-1 bg-transparent px-2 py-1 text-sm outline-none" />
        </div>
        <div className="mt-5">
          <p className="text-sm font-black text-charcoal">카테고리</p>
          <div className="mt-2 grid gap-2">
            <FilterButton active={!category} onClick={() => setCategory("")}>전체</FilterButton>
            {recipeCategories.map((item) => (
              <FilterButton key={item} active={category === item} onClick={() => setCategory(item)}>{item}</FilterButton>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <p className="text-sm font-black text-charcoal">목적</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button onClick={() => setIntent("")} className={cn("rounded-full border px-3 py-1 text-xs font-bold", !intent ? "border-navy bg-navy text-white" : "border-line bg-white text-navy")}>전체</button>
            {recipeIntents.slice(0, 14).map((item) => (
              <button key={item} onClick={() => setIntent(item)} className={cn("rounded-full border px-3 py-1 text-xs font-bold", intent === item ? "border-navy bg-navy text-white" : "border-line bg-white text-navy")}>{item}</button>
            ))}
          </div>
        </div>
      </aside>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-black text-gold">검색 결과</p>
            <h3 className="font-display text-3xl font-black text-navy">{recipes.length}개 조건식</h3>
          </div>
          <Link href="/tools/indicator-finder" className="hidden rounded-lg bg-navy px-4 py-2 text-sm font-black text-white md:inline-flex">
            문답으로 찾기
          </Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2" data-testid="recipe-list">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              onClick={() => trackEvent("condition_results_viewed", { recipeId: recipe.id, source: "recipes_list" })}
              className="rounded-lg border border-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-gold"
            >
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-gold/10 px-2 py-1 text-xs font-black text-gold">{recipe.category}</span>
                <span className="rounded-md bg-green/10 px-2 py-1 text-xs font-black text-green">{recipe.difficulty}</span>
              </div>
              <h4 className="mt-3 font-display text-2xl font-black text-navy">{recipe.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted">{recipe.summary}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-green">
                상세 보기
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={cn("rounded-lg border px-3 py-2 text-left text-sm font-bold", active ? "border-navy bg-navy text-white" : "border-line bg-white text-navy hover:border-gold")}>
      {children}
    </button>
  );
}
