import { redirect } from "next/navigation";

const legacySlugMap: Record<string, string> = {
  "ebook-beta": "ebook",
  "premium-article-pack": "premium-notes",
  "premium-pass": "premium-notes",
  "mock-league-earlybird": "mock-league"
};

export default function LegacyStoreProductPage({ params }: { params: { slug: string } }) {
  redirect(`/products/${legacySlugMap[params.slug] || params.slug}`);
}
