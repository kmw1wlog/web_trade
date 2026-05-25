import { ResourceCard } from "@/components/cards/ResourceCard";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { resources } from "@/content/resources";

export const metadata = { title: "무료 자료실 | 조건식실험실" };

export default function FreePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">무료 자료실</h1>
      <p className="mt-3 text-ink/70">이메일을 남기면 자료 링크 보기 상태를 확인할 수 있습니다. 실제 PDF 업로드는 MVP 이후 TODO입니다.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} />
        ))}
      </div>
      <div className="mt-8">
        <DisclosureBanner />
      </div>
    </div>
  );
}
