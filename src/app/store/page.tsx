import { ProductCard } from "@/components/cards/ProductCard";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { products } from "@/content/products";

export const metadata = { title: "스토어 | 조건식실험실" };

export default function StorePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">스토어</h1>
      <p className="mt-3 text-ink/70">전자책, 프리미엄 글, 프리미엄 패스, 모의투자 리그 얼리버드 상품을 확인하세요.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      <div className="mt-8">
        <DisclosureBanner />
      </div>
    </div>
  );
}
