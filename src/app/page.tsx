import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { SectionHeading } from "@/components/site/SectionHeading";
import { EbookMockup } from "@/components/products/EbookMockup";
import { MockupProductStack } from "@/components/products/MockupProductStack";
import { blogPosts } from "@/content/blog";
import { homeFaq } from "@/content/faq";
import { freePreviews } from "@/content/freePreviews";
import { flagshipProduct, products } from "@/content/products";

const featuredProducts = products.filter((product) => product.featured);

const productFinder = [
  ["처음 온 사람", "전자책 베타", "/products/ebook"],
  ["인스타 글을 보고 더 많은 사례가 궁금한 사람", "프리미엄 노트", "/products/premium-notes"],
  ["매매를 기록하고 싶은 사람", "기능웹", "/products/web-tools"],
  ["혼자 하면 안 하는 사람", "모의투자 리그", "/products/mock-league"],
  ["직접 설명을 듣고 싶은 사람", "강의 사전예약", "/products/course"],
  ["휴대폰에서 계속 쓰고 싶은 사람", "앱 베타 대기", "/products/app"]
];

const testimonials = [
  "조건식을 저장만 하다가 처음으로 실패 조건을 따로 적기 시작했습니다.",
  "수익 난 매매도 복기해야 한다는 걸 처음 알았습니다.",
  "관심종목을 색으로 나누니까 장중에 덜 흔들렸습니다."
];

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1fr_430px] md:items-center md:py-16">
          <div>
            <p className="text-sm font-black text-gold">투자 루틴 스케일링</p>
            <h1 className="mt-4 font-display text-5xl font-black leading-[1.08] text-navy md:text-6xl">
              단타 조건식,
              <br />
              감이 아니라 루틴으로 정리하세요.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              인스타에서 본 조건식과 차트 세팅을 전자책·프리미엄 노트·기능웹·모의투자 기록으로 이어보세요.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/products/ebook" className="rounded-lg bg-navy px-6 py-4 text-center text-sm font-black text-white transition hover:bg-green">
                대표 상품 보기
              </Link>
              <Link href="/products/premium-notes" className="rounded-lg border border-navy bg-white px-6 py-4 text-center text-sm font-black text-navy transition hover:bg-cream">
                프리미엄 노트 보기
              </Link>
            </div>
            <p className="mt-5 text-sm font-semibold text-muted">무료 자료는 아래에서 맛보기로 확인할 수 있습니다.</p>
          </div>
          <MockupProductStack />
        </div>
      </section>

      <section className="bg-cream py-12">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="지금 바로 시작할 수 있는 스케일링 상품" description="무료 자료보다 먼저, 매매 루틴을 실제로 정리하게 만드는 유료·핵심 상품을 보여드립니다." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            title="왜 조건식을 알아도 매매가 달라지지 않을까?"
            description="저장한 게시글은 많은데, 막상 장이 열리면 같은 실수를 반복합니다. 문제는 조건식이 부족해서가 아니라 기록하고, 실패 조건을 분리하고, 복기하는 루틴이 없기 때문입니다."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {["조건식만 보고 진입한다", "손절 기준이 없다", "수익 난 매매를 복기하지 않는다"].map((item) => (
              <div key={item} className="rounded-lg border border-line bg-cream p-6">
                <p className="text-sm font-bold text-gold">문제</p>
                <h3 className="mt-3 font-display text-2xl font-bold text-navy">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-cream py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_380px] md:items-center">
          <div>
            <p className="text-sm font-black text-gold">대표 상품</p>
            <h2 className="mt-3 font-display text-4xl font-black leading-tight text-navy">{flagshipProduct.name}</h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              초보 단타 조건식을 “진입 조건 - 실패 조건 - 복기 기준”으로 나눠 정리한 PDF입니다.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {flagshipProduct.includes.map((item) => (
                <p key={item} className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-semibold text-charcoal">
                  {item}
                </p>
              ))}
            </div>
            <Link href="/products/ebook" className="mt-7 inline-flex rounded-lg bg-navy px-6 py-4 text-sm font-black text-white transition hover:bg-green">
              전자책 베타 보기
            </Link>
          </div>
          <EbookMockup />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="나에게 맞는 상품은?" />
          <div className="grid gap-3 md:grid-cols-2">
            {productFinder.map(([who, product, href]) => (
              <Link key={who} href={href} className="flex items-center justify-between gap-4 rounded-lg border border-line bg-white p-5 transition hover:border-gold hover:shadow-soft">
                <span className="text-sm font-semibold text-muted">{who}</span>
                <span className="text-right font-display text-xl font-black text-navy">→ {product}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="무료로 먼저 확인해보세요" description="무료 맛보기는 상품 선택을 돕는 보조 섹션입니다. 루틴을 더 깊게 만들고 싶다면 전자책과 프리미엄 노트로 이어가세요." />
          <div className="grid gap-4 md:grid-cols-3">
            {freePreviews.map((preview) => (
              <div key={preview.title} className="rounded-lg border border-line bg-white p-5">
                <h3 className="font-display text-2xl font-bold text-navy">{preview.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{preview.description}</p>
                <Link href={preview.href} className="mt-5 inline-flex rounded-lg border border-navy px-4 py-3 text-sm font-bold text-navy">
                  무료 자료 받기
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="웹블로그" description="인스타에서 다 못 적은 조건식, 차트 세팅, 복기 루틴을 정리합니다." />
          <div className="grid gap-4 md:grid-cols-3">
            {blogPosts
              .filter((post) => ["volume-breakout-fail", "red-blue-watchlist", "stop-loss-before-condition"].includes(post.slug))
              .map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/blog" className="inline-flex rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white">
              웹블로그 전체 보기
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="수익률 자랑보다, 복기 가능한 루틴을 만듭니다." />
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <blockquote key={item} className="rounded-lg border border-line bg-white p-6 text-lg font-semibold leading-8 text-charcoal">
                “{item}”
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading title="FAQ" />
          <div className="grid gap-3">
            {homeFaq.map((faq) => (
              <details key={faq.question} className="rounded-lg border border-line bg-white p-5">
                <summary className="cursor-pointer font-display text-xl font-bold text-navy">{faq.question}</summary>
                <p className="mt-3 text-sm leading-6 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-8">
            <DisclosureBanner />
          </div>
        </div>
      </section>
    </div>
  );
}
