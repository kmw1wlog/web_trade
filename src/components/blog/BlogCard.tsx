import Link from "next/link";
import { getProduct } from "@/content/products";
import type { blogPosts } from "@/content/blog";

type BlogPost = (typeof blogPosts)[number];

export function BlogCard({ post }: { post: BlogPost }) {
  const product = getProduct(post.relatedProductSlug);

  return (
    <Link href={`/blog/${post.slug}`} className="group block rounded-lg border border-line bg-white p-5 transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
        <span className="rounded-md bg-cream px-2 py-1 text-green">{post.category}</span>
        {product ? <span className="rounded-md bg-gold/10 px-2 py-1 text-gold">관련 상품: {product.type}</span> : null}
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-navy group-hover:text-green">{post.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
    </Link>
  );
}
