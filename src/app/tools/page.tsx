import Link from "next/link";
import { TradeJournalForm } from "@/components/forms/TradeJournalForm";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ColorClassifier } from "@/components/tools/ColorClassifier";
import { RiskRewardCalculator } from "@/components/tools/RiskRewardCalculator";
import { IndicatorFinder } from "@/components/tools/IndicatorFinder";

export const metadata = {
  title: "기능웹 | 투자 루틴 스케일링",
  description: "지표/조건식 찾기, 손익비 계산기, 관심종목 색상 분류, 모의투자 기록장을 한 화면에서 사용하세요."
};

export default function ToolsPage() {
  return (
    <div className="bg-cream">
      <section className="border-b border-line bg-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-black text-gold">기능웹</p>
          <h1 className="mt-4 font-display text-5xl font-black text-navy">기록하지 않는 조건식은 사라집니다.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            조건식, 관심종목, 모의투자, 복기를 웹에서 남기세요. 기능웹은 메인 상품을 보조하는 실제 사용 페이지입니다.
          </p>
          <Link href="/tools/indicator-finder" className="mt-7 inline-flex rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white">
            지표 찾기 시작
          </Link>
        </div>
      </section>

      <section id="indicator-finder" className="scroll-mt-24 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="지표/조건식 찾기" description="상황을 고르면 조건식과 지표 레시피를 추천합니다." />
          <IndicatorFinder />
        </div>
      </section>

      <section id="rr-calculator" className="scroll-mt-24 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="손익비 계산기" />
          <RiskRewardCalculator />
        </div>
      </section>

      <section id="color-classifier" className="scroll-mt-24 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="관심종목 색상 분류" description="빨강은 강한 관심/급등 관찰, 파랑은 눌림/관찰, 회색은 제외/복기입니다." />
          <ColorClassifier />
        </div>
      </section>

      <section id="trade-journal" className="scroll-mt-24 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <SectionHeading title="모의투자 기록장" />
          <TradeJournalForm />
          <div className="mt-8">
            <DisclosureBanner />
          </div>
        </div>
      </section>
    </div>
  );
}
