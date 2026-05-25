import { DisclosureBanner } from "@/components/site/DisclosureBanner";

export const metadata = { title: "투자 유의사항 | 조건식실험실" };

const sections = [
  ["투자 권유 아님", "조건식실험실의 모든 콘텐츠는 투자 권유, 종목 추천, 매수·매도 지시가 아닙니다."],
  ["수익 보장 없음", "교육 자료와 모의투자 예시는 특정 수익률이나 결과를 보장하지 않습니다."],
  ["손실 보전 없음", "실제 투자에서 발생하는 손실은 보전하지 않으며 판단과 책임은 본인에게 있습니다."],
  ["모의투자와 실제투자의 차이", "모의투자는 체결, 심리, 유동성, 수수료 등 실제 환경과 다를 수 있습니다."],
  ["제휴/광고 가능성 고지", "일부 콘텐츠에는 광고 또는 제휴 관계가 포함될 수 있으며 별도로 표시합니다."],
  ["개인정보 수집 목적", "자료 제공, 대기 신청, 문의 응대, 전환 측정을 위해 최소 정보를 수집합니다."],
  ["환불정책", "디지털 상품과 사전예약 상품별 상세 환불 기준은 상품 상세 및 결제 시점에 안내합니다."],
  ["코인/레버리지 고위험 고지", "코인, 선물, 레버리지 상품은 고위험 영역이며 본 웹에서는 별도 대기자 수요만 조사합니다."]
];

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold">투자 유의사항</h1>
      <div className="mt-8 grid gap-4">
        {sections.map(([title, description]) => (
          <section key={title} className="rounded-3xl border border-ink/10 bg-white/75 p-5">
            <h2 className="font-display text-2xl font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">{description}</p>
          </section>
        ))}
      </div>
      <div className="mt-8">
        <DisclosureBanner />
      </div>
    </div>
  );
}
