import { articles } from "@/content/articles";

const relatedProductBySlug: Record<string, string> = {
  "volume-breakout-fail": "premium-notes",
  "previous-high-breakout": "ebook",
  "red-blue-watchlist": "web-tools",
  "condition-is-filter": "ebook",
  "review-profitable-trades": "premium-notes",
  "stop-loss-before-condition": "ebook",
  "one-stock-review": "mock-league",
  "failure-cases-matter": "premium-notes",
  "ai-condition-prompt": "app",
  "mock-before-real": "mock-league"
};

export const blogPosts = articles.map((article) => ({
  slug: article.slug,
  title: article.title,
  excerpt: article.excerpt,
  category: article.category === "도구" ? "차트 세팅" : article.category === "복기" ? "복기 루틴" : article.category === "AI" ? "AI/도구" : article.category,
  tags: article.tags,
  readingMinutes: article.readingMinutes,
  relatedProductSlug: relatedProductBySlug[article.slug] || "ebook",
  freePreviewLabel: article.freeResourceSlug ? "이 글과 연결된 무료 맛보기" : "무료 맛보기",
  body: article.body
}));

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
