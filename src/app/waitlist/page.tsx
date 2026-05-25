import { Suspense } from "react";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";

export const metadata = {
  title: "앱/강의 대기 | 투자 루틴 스케일링",
  description: "앱 베타, 4주 조건식 실험반, 모의투자 리그, 데이터/API, 프리미엄 패스 대기 신청을 받습니다."
};

const options = ["앱 베타", "4주 조건식 실험반", "모의투자 리그", "데이터/API", "프리미엄 패스"];

export default function WaitlistPage() {
  return (
    <div className="bg-cream">
      <section className="border-b border-line bg-white py-14">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-sm font-black text-gold">대기 신청</p>
          <h1 className="mt-4 font-display text-5xl font-black leading-tight text-navy">다음 기능을 먼저 써보고 싶다면 대기 신청하세요</h1>
          <p className="mt-5 text-lg leading-8 text-muted">앱, 강의, API, 모의투자, 프리미엄 패스 관심도를 한 곳에서 받습니다.</p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-2xl px-4">
          <Suspense fallback={null}>
            <WaitlistForm type="app" options={options} source="waitlist_page" />
          </Suspense>
          <div className="mt-8">
            <DisclosureBanner />
          </div>
        </div>
      </section>
    </div>
  );
}
