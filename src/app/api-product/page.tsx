import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { HeroSection } from "@/components/site/HeroSection";
import { waitlistTypes } from "@/content/waitlists";

export const metadata = { title: "데이터/API 수요조사 | 조건식실험실" };

export default function ApiProductPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <HeroSection title="조건식 실험 데이터를 API 제품으로 확장할 수 있을까요?" description="제품 페이지는 /api-product이며, Next.js API route와 혼동되지 않도록 분리했습니다." />
      <div className="mt-8">
        <WaitlistForm type="api" options={waitlistTypes.api} source="api_product_page" />
      </div>
      <div className="mt-8">
        <DisclosureBanner />
      </div>
    </div>
  );
}
