import type { Resource } from "@/content/resources";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="rounded-3xl border border-ink/10 bg-white/75 p-5 shadow-sm">
      <p className="text-xs font-bold text-clay">DM 키워드: {resource.keyword}</p>
      <h3 className="mt-3 font-display text-2xl font-bold text-ink">{resource.title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink/70">{resource.description}</p>
      <p className="mt-3 text-xs text-ink/55">추천 대상: {resource.audience}</p>
      <div className="mt-5">
        {/* TODO: 실제 PDF 생성/업로드 후 자료별 다운로드 URL로 연결합니다. */}
        <LeadCaptureForm interest={resource.slug} keyword={resource.keyword} compact />
      </div>
    </article>
  );
}
