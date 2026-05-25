import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { waitlistTypes } from "@/content/waitlists";

export const metadata = { title: "코인 실험실 게이트 | 조건식실험실" };

export default function CryptoGatePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-sm font-bold text-clay">코인 분리 게이트</p>
      <h1 className="mt-3 font-display text-5xl font-bold text-ink">코인 실험실은 별도 프로젝트로 분리 준비 중입니다.</h1>
      <p className="mt-5 text-lg leading-8 text-ink/72">
        본 종합웹은 주식 조건식·모의투자·기록 도구 중심입니다. 코인 쪽은 규제·레버리지·거래소 이슈가 달라
        별도 프로젝트로 수요만 조사합니다.
      </p>
      <div className="mt-8 rounded-3xl border border-clay/20 bg-clay/10 p-5 text-sm leading-6">
        거래소 레퍼럴 링크, 카피트레이딩, 실시간 타점, 선물/레버리지 가입 유도, 자동매매 API 연결은 제공하지 않습니다.
      </div>
      <div className="mt-8">
        <WaitlistForm type="crypto" options={waitlistTypes.crypto} source="crypto_gate" />
      </div>
      <div className="mt-8">
        <DisclosureBanner />
      </div>
    </div>
  );
}
