import Link from "next/link";
import type { Product } from "@/content/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/store/${product.slug}`} className="rounded-3xl border border-ink/10 bg-white/70 p-5 transition hover:-translate-y-1 hover:shadow-soft">
      <p className="text-xs font-bold uppercase tracking-widest text-moss">{product.type === "subscription" ? "구독" : "단건"}</p>
      <h3 className="mt-3 font-display text-2xl font-bold text-ink">{product.name}</h3>
      <p className="mt-2 text-xl font-bold text-clay">{product.price}</p>
      <p className="mt-3 text-sm leading-6 text-ink/70">{product.description}</p>
    </Link>
  );
}
