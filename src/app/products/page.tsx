import Link from "next/link";
import { ProductCard } from "@/components/cards/ProductCard";
import { ProductComparisonTable } from "@/components/products/ProductComparisonTable";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { SectionHeading } from "@/components/site/SectionHeading";
import { homeFaq } from "@/content/faq";
import { products } from "@/content/products";

export const metadata = {
  title: "상품 | 투자 루틴 스케일링",
  description: "투자 루틴에 맞는 전자책, 프리미엄 노트, 기능웹, 모의투자 리그, 강의, 앱 베타 상품을 선택하세요."
};

export default function ProductsPage() {
  return (
    <div className="bg-cream">
      <section className="border-b border-line bg-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-black text-gold">상품</p>
          <h1 className="mt-4 font-display text-5xl font-black leading-tight text-navy">투자 루틴에 맞는 상품을 선택하세요</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            전자책으로 구조를 잡고, 프리미엄 노트와 기능웹으로 기록 루틴을 이어가세요.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="상품 비교표" description="무료 자료 카드는 제외하고, 유료 상품과 사전수요 상품만 비교합니다." />
          <ProductComparisonTable />
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="추천 흐름" />
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["먼저 구조를 잡기", "전자책", "/products/ebook"],
              ["사례를 더 보기", "프리미엄 노트", "/products/premium-notes"],
              ["직접 기록하기", "기능웹", "/products/web-tools"],
              ["습관을 붙이기", "모의투자 리그", "/products/mock-league"],
              ["같이 배우기", "강의 사전예약", "/products/course"],
              ["모바일로 옮기기", "앱 베타", "/products/app"]
            ].map(([label, title, href]) => (
              <Link key={href} href={href} className="rounded-lg border border-line bg-white p-5 transition hover:shadow-soft">
                <p className="text-sm font-bold text-gold">{label}</p>
                <p className="mt-2 font-display text-2xl font-black text-navy">{title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading title="FAQ" />
          <div className="grid gap-3">
            {homeFaq.map((faq) => (
              <details key={faq.question} className="rounded-lg border border-line p-5">
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
