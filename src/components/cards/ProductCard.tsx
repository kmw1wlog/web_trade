import Link from "next/link";
import type { Product } from "@/content/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={product.href} className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="rounded-md bg-green/10 px-2.5 py-1 text-xs font-bold text-green">{product.type}</p>
        {product.featured ? <span className="text-xs font-bold text-gold">대표</span> : null}
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-navy">{product.name}</h3>
      <p className="mt-3 text-2xl font-black text-charcoal">{product.priceLabel}</p>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{product.shortDescription}</p>
      <span className="mt-5 inline-flex rounded-lg bg-navy px-4 py-3 text-center text-sm font-bold text-white transition group-hover:bg-green">
        {product.cta}
      </span>
    </Link>
  );
}
