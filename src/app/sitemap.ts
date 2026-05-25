import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog";
import { products } from "@/content/products";
import { personas } from "@/content/personas";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/start",
    "/blog",
    "/free",
    "/tools",
    "/tools/rr-calculator",
    "/tools/trade-journal",
    "/tools/color-classifier",
    "/products",
    "/mock",
    "/waitlist",
    "/partners",
    "/crypto-gate",
    "/disclosure",
    "/privacy",
    "/terms",
    "/success"
  ];

  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path), lastModified: new Date() })),
    ...blogPosts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: new Date() })),
    ...products.map((product) => ({ url: absoluteUrl(product.href), lastModified: new Date() })),
    ...personas.map((persona) => ({ url: absoluteUrl(`/persona/${persona.slug}`), lastModified: new Date() }))
  ];
}
