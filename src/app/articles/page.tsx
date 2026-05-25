import { ArticleCard } from "@/components/cards/ArticleCard";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { articles } from "@/content/articles";

export const metadata = { title: "게시글 | 조건식실험실" };

export default function ArticlesPage() {
  const tags = ["전체", "조건식", "복기", "도구", "모의투자", "AI"];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">조건식 실험 게시글</h1>
      <p className="mt-3 text-ink/70">태그 필터는 MVP에서는 정적 UI입니다. 글을 읽고 무료 자료와 기능웹으로 이어가세요.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-sm text-ink/70">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
      <div className="mt-8">
        <DisclosureBanner />
      </div>
    </div>
  );
}
