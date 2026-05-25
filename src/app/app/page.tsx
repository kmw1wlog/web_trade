import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { HeroSection } from "@/components/site/HeroSection";
import { waitlistTypes } from "@/content/waitlists";

export const metadata = { title: "앱 베타 사전예약 | 조건식실험실" };

export default function AppWaitlistPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <HeroSection title="조건식 실험을 손 안에서 기록하는 앱을 준비 중입니다." description="필요한 기능에 투표하고 베타 오픈 알림을 받아보세요." />
      <div className="mt-8">
        <WaitlistForm type="app" options={waitlistTypes.app} source="app_page" />
      </div>
      <div className="mt-8">
        <DisclosureBanner />
      </div>
    </div>
  );
}
