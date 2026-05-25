import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { products } from "@/content/products";
import { personas } from "@/content/personas";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/start",
    "/articles",
    "/free",
    "/tools",
    "/tools/rr-calculator",
    "/tools/trade-journal",
    "/tools/color-classifier",
    "/store",
    "/mock",
    "/app",
    "/course",
    "/api-product",
    "/partners",
    "/crypto-gate",
    "/disclosure",
    "/privacy",
    "/terms",
    "/success"
  ];

  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path), lastModified: new Date() })),
    ...articles.map((article) => ({ url: absoluteUrl(`/articles/${article.slug}`), lastModified: new Date() })),
    ...products.map((product) => ({ url: absoluteUrl(`/store/${product.slug}`), lastModified: new Date() })),
    ...personas.map((persona) => ({ url: absoluteUrl(`/persona/${persona.slug}`), lastModified: new Date() }))
  ];
}
