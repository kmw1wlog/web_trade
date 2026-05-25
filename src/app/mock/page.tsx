import Link from "next/link";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { HeroSection } from "@/components/site/HeroSection";
import { waitlistTypes } from "@/content/waitlists";

export const metadata = { title: "모의투자 리그 | 조건식실험실" };

export default function MockPage() {
  const criteria = ["수익률 30", "MDD 관리 20", "손절 준수 15", "진입 근거 명확성 15", "복기 성실도 10", "과도한 레버리지 감점"];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <HeroSection
        title="모의투자 리그는 수익률만 평가하지 않습니다."
        description="조건식 실험, 기준 준수, 복기 성실도를 함께 보는 교육형 실험 리그를 준비 중입니다."
        ctas={[{ label: "기록 폼으로 이동", href: "/tools" }, { label: "얼리버드 상품 보기", href: "/products/mock-league", variant: "secondary" }]}
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-ink/10 bg-white/75 p-6">
          <h2 className="font-display text-3xl font-bold">평가 기준 예시</h2>
          <div className="mt-5 grid gap-3">
            {criteria.map((item) => (
              <p key={item} className="rounded-2xl bg-paper px-4 py-3 text-sm">{item}</p>
            ))}
          </div>
          <Link href="/tools/trade-journal" className="mt-5 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper">모의투자 기록하기</Link>
        </section>
        <WaitlistForm type="mock" options={waitlistTypes.mock} source="mock_page" />
      </div>
      <div className="mt-8">
        <DisclosureBanner />
      </div>
    </div>
  );
}
