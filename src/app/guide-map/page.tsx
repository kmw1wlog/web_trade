import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";

export const metadata: Metadata = {
  title: "기술적 분석 가이드 맵 | 투자도구 허브",
  description: "캔들, 추세선, 차트 패턴, 피보나치, 보조지표를 한 화면에서 확인하는 가이드 맵입니다."
};

const guideGroups = [
  { title: "캔들 패턴", items: ["장대양봉·음봉", "도지·망치형", "장악형", "샛별형", "트위저", "철도형"] },
  { title: "추세선&채널", items: ["상승 추세선", "하락 추세선", "박스권", "채널 돌파", "갭 지지"] },
  { title: "이동평균/그랜빌", items: ["5/20 골든크로스", "정배열", "20일선 눌림", "그랜빌 매수", "역배열 제외"] },
  { title: "거래량/거래대금", items: ["거래량 150%", "거래대금 상위", "회전율", "거래량 없는 돌파", "클라이맥스"] },
  { title: "국장 단타 전략", items: ["상따", "종베", "시초가", "짝꿍매매", "테마 순환", "VI 이후"] },
  { title: "보조지표", items: ["MACD", "RSI", "볼린저밴드", "스토캐스틱", "VWAP", "CVD"] },
  { title: "패턴/파동", items: ["ABCD", "하모닉", "피보나치", "엘리어트", "삼각수렴"] },
  { title: "리스크/복기", items: ["손절 기준", "실패 조건", "MDD", "감정 태그", "과최적화"] }
];

export default function GuideMapPage() {
  return (
    <div className="bg-[#e8e8e6] py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-sm font-black text-gold">무료 지표·전자책</p>
          <h1 className="mt-2 font-display text-4xl font-black text-navy">기술적 분석 가이드 맵</h1>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-muted">
            PDF와 기술적 분석 가이드의 구조를 웹에서 먼저 훑어보는 무료 마인드맵입니다. 각 항목은 조건식 레시피와 문답 도구로 이어집니다.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {guideGroups.map((group) => (
            <a key={group.title} href={`#${group.title}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-black text-green">
              {group.title}
            </a>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guideGroups.map((group) => (
            <section key={group.title} id={group.title} className="rounded-lg border border-line bg-white shadow-sm">
              <div className="rounded-t-lg bg-green px-5 py-3">
                <h2 className="font-display text-2xl font-black text-white">{group.title}</h2>
              </div>
              <ol className="grid gap-2 p-5 text-sm font-bold text-charcoal">
                {group.items.map((item, index) => (
                  <li key={item} className="flex gap-3 rounded-lg bg-cream px-3 py-2">
                    <span className="font-black text-gold">{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/tools/indicator-finder" className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-black text-white">
            지표 찾기 시작
            <ArrowRight size={16} />
          </Link>
          <Link href="/recipes" className="inline-flex items-center gap-2 rounded-lg border border-navy bg-white px-5 py-3 text-sm font-black text-navy">
            조건식 80개 보기
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-8">
          <DisclosureBanner />
        </div>
      </div>
    </div>
  );
}
