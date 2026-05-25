import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckoutButton } from "@/components/forms/CheckoutButton";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { getProduct, productDisclaimer, products } from "@/content/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  return {
    title: product ? `${product.name} | 조건식실험실` : "상품 | 조건식실험실",
    description: product?.description
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="text-sm font-bold text-clay">{product.type === "subscription" ? "구독 상품" : "단건 상품"}</p>
        <h1 className="mt-3 font-display text-5xl font-bold text-ink">{product.name}</h1>
        <p className="mt-4 text-2xl font-bold text-clay">{product.price}</p>
        <p className="mt-4 text-lg leading-8 text-ink/75">{product.description}</p>

        <Section title="누가 보면 좋은가요?" items={product.forWhom} />
        <Section title="포함 내용" items={product.includes} />
        <Section title="제공하지 않는 것" items={["종목 추천", "수익 보장", "실시간 매수/매도 지시", "손실 보전"]} />

        <div className="mt-8 rounded-3xl border border-ink/10 bg-white/70 p-5">
          <h2 className="font-display text-2xl font-bold">환불/사전예약 안내</h2>
          <p className="mt-3 text-sm leading-6 text-ink/70">디지털 상품 및 사전예약 상품의 세부 환불정책은 오픈 전 별도 고지합니다. 현재 MVP에서는 결제 환경변수가 없으면 대기 신청으로 대체됩니다.</p>
        </div>
      </div>
      <aside className="space-y-5">
        <CheckoutButton productSlug={product.slug} />
        <div className="rounded-3xl border border-clay/20 bg-clay/10 p-5 text-sm leading-6 text-ink">{productDisclaimer}</div>
        <DisclosureBanner />
      </aside>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-8 rounded-3xl border border-ink/10 bg-white/70 p-5">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <ul className="mt-4 grid gap-2 text-sm text-ink/70">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </section>
  );
}
