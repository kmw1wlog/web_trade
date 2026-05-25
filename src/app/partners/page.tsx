import { PartnerInquiryForm } from "@/components/forms/PartnerInquiryForm";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";

export const metadata = { title: "제휴 문의 | 조건식실험실" };

export default function PartnersPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_420px]">
      <div>
        <p className="text-sm font-bold text-clay">제휴 문의</p>
        <h1 className="mt-3 font-display text-5xl font-bold text-ink">기록형 투자 교육 흐름을 함께 만들 파트너를 찾습니다.</h1>
        <p className="mt-4 text-lg leading-8 text-ink/72">MTS, 투자앱, 데이터업체, 교육업체, 인플루언서, 커뮤니티 제휴 카테고리를 열어둡니다.</p>
        <div className="mt-8">
          <DisclosureBanner />
        </div>
      </div>
      <PartnerInquiryForm />
    </div>
  );
}
