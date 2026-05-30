import { describe, expect, it } from "vitest";
import { conditionRecipes, findRecipes, recipeCategories } from "@/content/conditionRecipes";

describe("condition recipes", () => {
  it("contains at least 80 categorized recipes", () => {
    expect(conditionRecipes).toHaveLength(80);
    expect(recipeCategories.length).toBeGreaterThanOrEqual(8);
  });

  it("finds practical recipes by intent", () => {
    const results = findRecipes({ intent: "거래량 급증", limit: 5 });
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((recipe) => recipe.title.includes("거래량") || recipe.freePreview.includes("거래량"))).toBe(true);
  });
});
