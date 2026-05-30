export type Ebook = {
  slug: string;
  title: string;
  subtitle: string;
  priceLabel: string;
  audience: string;
  type: "free" | "paid" | "waitlist";
  accent: "gold" | "green" | "navy" | "rose";
  bullets: string[];
  cta: string;
  href: string;
};

export const ebooks: Ebook[] = [
  {
    slug: "cvd-starter",
    title: "CVD 초보 가이드",
    subtitle: "가격대별 매수·매도 물량 차이를 보는 법",
    priceLabel: "무료",
    audience: "지표를 처음 보는 사람",
    type: "free",
    accent: "green",
    bullets: ["CVD 기본 개념", "가격대별 거래 규모", "상관계수 읽는 법"],
    cta: "무료로 담기",
    href: "#free-ebook-form"
  },
  {
    slug: "volume-condition",
    title: "거래량 조건식 입문",
    subtitle: "상따·종베·시초가에서 거래량을 분리하는 체크리스트",
    priceLabel: "무료",
    audience: "국장 단타 입문자",
    type: "free",
    accent: "gold",
    bullets: ["거래량 급증", "전고점 돌파", "실패 조건"],
    cta: "무료로 담기",
    href: "#free-ebook-form"
  },
  {
    slug: "tradingview-checklist",
    title: "TradingView 지표 체크리스트",
    subtitle: "지표를 많이 켜기보다 어떤 상황에 쓸지 정리합니다",
    priceLabel: "무료",
    audience: "차트 세팅을 정리할 사람",
    type: "free",
    accent: "navy",
    bullets: ["기본 지표 세팅", "알림 기준", "복기 캡처 양식"],
    cta: "무료로 담기",
    href: "#free-ebook-form"
  },
  {
    slug: "condition-lab-beta",
    title: "조건식 실험노트 전자책 베타",
    subtitle: "진입 조건, 실패 조건, 복기 기준으로 나눈 PDF",
    priceLabel: "14,900원",
    audience: "구조를 깊게 잡을 사람",
    type: "paid",
    accent: "rose",
    bullets: ["조건식 기본 구조", "국장 단타 사례", "하루 10분 복기 루틴"],
    cta: "유료판 보기",
    href: "/products/ebook"
  }
];
