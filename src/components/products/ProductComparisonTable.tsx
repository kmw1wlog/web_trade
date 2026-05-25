import Link from "next/link";
import { products } from "@/content/products";

export function ProductComparisonTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white">
      <div className="hidden grid-cols-[1fr_150px_1.2fr_1.3fr_150px] border-b border-line bg-cream px-4 py-3 text-sm font-bold text-navy md:grid">
        <span>상품명</span>
        <span>가격</span>
        <span>추천 대상</span>
        <span>제공 내용</span>
        <span>CTA</span>
      </div>
      {products.map((product) => (
        <div key={product.slug} className="grid gap-3 border-b border-line px-4 py-4 text-sm last:border-b-0 md:grid-cols-[1fr_150px_1.2fr_1.3fr_150px] md:items-center">
          <div>
            <p className="font-display text-lg font-bold text-navy">{product.name}</p>
            <p className="mt-1 text-xs font-bold text-green">{product.type}</p>
          </div>
          <p className="font-bold text-charcoal">{product.priceLabel}</p>
          <p className="leading-6 text-muted">{product.forWhom[0]}</p>
          <p className="leading-6 text-muted">{product.shortDescription}</p>
          <Link href={product.href} className="rounded-lg bg-navy px-3 py-2 text-center text-xs font-bold text-white">
            {product.cta}
          </Link>
        </div>
      ))}
    </div>
  );
}
