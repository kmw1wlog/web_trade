import { resources } from "@/content/resources";

const keywordMap: Record<string, string> = {
  조건: "condition-note",
  색상: "color-setting",
  거래량: "volume-failure",
  모의투자: "mock-trade-template",
  복기: "daily-review-checklist"
};

export function getResourceByKeyword(keyword?: string) {
  const normalized = keyword?.trim();
  if (!normalized) return null;
  const slug = keywordMap[normalized];
  return resources.find((resource) => resource.slug === slug) ?? null;
}

export function getKeywordDestination(keyword?: string) {
  const normalized = keyword?.trim();
  if (normalized === "API") return "/api-product";
  if (normalized === "코인") return "/crypto-gate";
  const resource = getResourceByKeyword(normalized);
  return resource ? `/free?resource=${resource.slug}` : "/free";
}
