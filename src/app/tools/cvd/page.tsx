import type { Metadata } from "next";
import { CvdDashboard } from "@/components/tools/CvdDashboard";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";

export const metadata: Metadata = {
  title: "CVD 차트 데모 | 투자도구 허브",
  description: "가격대별 CVD, 통합/개별 차트, 상관계수, 랭킹과 히트맵을 데모로 체험합니다."
};

export default function CvdToolPage() {
  return (
    <div className="bg-cream py-8">
      <div className="mx-auto max-w-[1500px] px-4">
        <CvdDashboard />
        <div className="mx-auto mt-8 max-w-4xl">
          <DisclosureBanner />
        </div>
      </div>
    </div>
  );
}
