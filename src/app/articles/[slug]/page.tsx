import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTAButton } from "@/components/site/CTAButton";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { articles, getArticle } from "@/content/articles";
import { getResource } from "@/content/resources";
import { getProduct } from "@/content/products";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  return {
    title: article ? `${article.title} | 조건식실험실` : "게시글 | 조건식실험실",
    description: article?.excerpt
  };
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const resource = article.freeResourceSlug ? getResource(article.freeResourceSlug) : null;
  const product = article.productSlug ? getProduct(article.productSlug) : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/articles" className="text-sm font-bold text-clay">← 게시글 목록</Link>
      <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-ink">{article.title}</h1>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-moss px-3 py-1 text-paper">{article.category}</span>
        {article.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-oat px-3 py-1 text-ink/70">#{tag}</span>
        ))}
      </div>
      <div className="mt-8 grid gap-5 text-lg leading-8 text-ink/82">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {resource ? (
        <div className="my-10 rounded-3xl bg-ink p-6 text-paper">
          <p className="font-display text-2xl font-bold">{resource.title}</p>
          <p className="mt-2 text-sm text-paper/75">{resource.description}</p>
          <CTAButton href={`/free?resource=${resource.slug}`} variant="secondary" className="mt-5">
            무료 자료 받기
          </CTAButton>
        </div>
      ) : null}
      <div className="grid gap-3 rounded-3xl border border-ink/10 bg-white/75 p-5 sm:grid-cols-2">
        <CTAButton href={resource ? `/free?resource=${resource.slug}` : "/free"}>무료 자료 받기</CTAButton>
        <CTAButton href={article.toolSlug ? `/tools/${article.toolSlug}` : "/tools"} variant="ghost">관련 기능웹 사용</CTAButton>
        <CTAButton href={product ? `/store/${product.slug}` : "/store/premium-article-pack"} variant="ghost">프리미엄 사례 보기</CTAButton>
        <CTAButton href="/tools/trade-journal" variant="ghost">모의투자 기록하기</CTAButton>
      </div>
      <div className="mt-8">
        <DisclosureBanner />
      </div>
    </article>
  );
}
