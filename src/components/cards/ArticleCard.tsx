import Link from "next/link";
import type { Article } from "@/content/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group rounded-lg border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-center gap-2 text-xs font-semibold text-clay">
        <span>{article.category}</span>
        <span>·</span>
        <span>{article.readingMinutes}분</span>
      </div>
      <h3 className="mt-3 font-display text-2xl font-bold text-ink group-hover:text-moss">{article.title}</h3>
      <p className="mt-3 text-sm leading-6 text-ink/68">{article.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-oat/70 px-3 py-1 text-xs text-ink/70">
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
