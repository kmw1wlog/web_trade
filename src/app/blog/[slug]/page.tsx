import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { blogPosts, getBlogPost } from "@/content/blog";
import { getProduct } from "@/content/products";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug);
  return {
    title: post ? `${post.title} | 웹블로그` : "웹블로그",
    description: post?.excerpt
  };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();
  const relatedProduct = getProduct(post.relatedProductSlug);
  const nextPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <article className="bg-cream">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/blog" className="text-sm font-black text-gold">웹블로그 / {post.category}</Link>
        <h1 className="mt-4 font-display text-5xl font-black leading-tight text-navy">{post.title}</h1>
        <div className="mt-6 rounded-lg border border-line bg-white p-5">
          <p className="text-sm font-black text-gold">인스타에서 본 핵심 요약</p>
          <p className="mt-3 text-lg leading-8 text-charcoal">{post.excerpt}</p>
          {relatedProduct ? (
            <Link href={relatedProduct.href} className="mt-4 inline-flex rounded-lg bg-navy px-4 py-3 text-sm font-bold text-white">
              이 글과 관련된 상품: {relatedProduct.type}
            </Link>
          ) : null}
        </div>

        <div className="mt-8 grid gap-5 text-lg leading-8 text-charcoal">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="my-10 rounded-lg border border-gold/30 bg-white p-6">
          <p className="text-sm font-black text-gold">{post.freePreviewLabel}</p>
          <h2 className="mt-2 font-display text-3xl font-black text-navy">무료 맛보기로 먼저 기준을 확인하세요.</h2>
          <p className="mt-3 text-sm leading-6 text-muted">무료 자료는 보조 흐름입니다. 글이 도움됐다면 아래 상품 CTA에서 루틴 정리로 이어가세요.</p>
          <Link href="/waitlist?preview=blog" className="mt-5 inline-flex rounded-lg border border-navy px-4 py-3 text-sm font-bold text-navy">
            무료 맛보기 신청
          </Link>
        </div>

        <div className="rounded-lg bg-navy p-6 text-white">
          <h2 className="font-display text-3xl font-black leading-tight">
            이 글이 도움됐다면,
            <br />
            조건식을 저장하는 단계에서 기록하고 복기하는 단계로 넘어가세요.
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Link href="/products/ebook" className="rounded-lg bg-white px-4 py-3 text-center text-sm font-black text-navy">
              조건식 실험노트 전자책 보기
            </Link>
            <Link href="/products/premium-notes" className="rounded-lg border border-white/30 px-4 py-3 text-center text-sm font-black text-white">
              프리미엄 사례 노트 보기
            </Link>
            <Link href="/tools" className="rounded-lg border border-white/30 px-4 py-3 text-center text-sm font-black text-white">
              모의투자 기록하기
            </Link>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="font-display text-3xl font-black text-navy">다음에 볼 글</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {nextPosts.map((item) => (
              <BlogCard key={item.slug} post={item} />
            ))}
          </div>
        </section>

        <div className="mt-10">
          <DisclosureBanner />
        </div>
      </div>
    </article>
  );
}
