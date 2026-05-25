import { BlogCard } from "@/components/blog/BlogCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { blogPosts } from "@/content/blog";

export const metadata = {
  title: "웹블로그 | 투자 루틴 스케일링",
  description: "인스타에서 다 못 적은 조건식, 차트 세팅, 복기 루틴을 정리합니다."
};

export default function BlogPage() {
  const categories = ["조건식", "차트 세팅", "복기 루틴", "모의투자", "AI/도구"];

  return (
    <div className="bg-cream">
      <section className="border-b border-line bg-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-black text-gold">웹블로그</p>
          <h1 className="mt-4 font-display text-5xl font-black text-navy">웹블로그</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            인스타에서 다 못 적은 조건식, 차트 세팅, 복기 루틴을 정리합니다.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span key={category} className="rounded-md border border-line bg-cream px-3 py-2 text-sm font-bold text-navy">
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="글 목록" description="각 글에는 관련 상품 CTA를 함께 붙여, 읽고 끝나는 흐름이 아니라 루틴 정리로 이어지게 했습니다." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
