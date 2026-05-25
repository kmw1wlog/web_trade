import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { waitlistTypes } from "@/content/waitlists";

export const metadata = { title: "강의 사전수요 | 조건식실험실" };

export default function CoursePage() {
  const curriculum = ["1주차: 조건식은 비법이 아니라 필터", "2주차: 손절 기준과 실패 조건", "3주차: 하루 1종목 복기 루틴", "4주차: 모의투자 기록 발표와 개선"];

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_420px]">
      <div>
        <p className="text-sm font-bold text-clay">강의 사전수요 조사</p>
        <h1 className="mt-3 font-display text-5xl font-bold text-ink">초보 단타 조건식 4주 실험반</h1>
        <p className="mt-4 text-lg leading-8 text-ink/72">강의는 종목 리딩이 아니라 조건식 구조, 기록법, 복기 루틴을 함께 실험하는 교육형 프로그램으로 기획합니다.</p>
        <div className="mt-8 grid gap-3">
          {curriculum.map((item) => (
            <p key={item} className="rounded-2xl bg-white/75 px-5 py-4 text-sm font-semibold">{item}</p>
          ))}
        </div>
        <div className="mt-8">
          <DisclosureBanner />
        </div>
      </div>
      <WaitlistForm type="course" options={waitlistTypes.course} source="course_page" />
    </div>
  );
}
