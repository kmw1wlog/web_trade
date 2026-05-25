import { redirect } from "next/navigation";

export default function LegacyArticlePage({ params }: { params: { slug: string } }) {
  redirect(`/blog/${params.slug}`);
}
