export type Product = {
  slug: string;
  type: string;
  name: string;
  priceLabel: string;
  shortDescription: string;
  href: string;
  cta: string;
  featured: boolean;
  includes: string[];
  forWhom: string[];
  hero: string;
  detailDescription: string;
  notIncluded: string[];
};

export const productDisclaimer =
  "본 상품은 투자 추천이나 수익 보장을 제공하지 않습니다. 조건식 학습, 모의투자, 기록·복기 목적의 교육 콘텐츠입니다.";

export const products: Product[] = [
  {
    slug: "ebook",
    type: "전자책",
    name: "조건식 실험노트 전자책 베타",
    priceLabel: "14,900원",
    shortDescription: "초보 단타 조건식, 실패 조건, 복기 루틴 PDF",
    href: "/products/ebook",
    cta: "전자책 보기",
    featured: true,
    includes: ["PDF", "조건식 체크리스트", "실패 조건표", "모의투자 기록표", "색상 세팅 예시", "하루 10분 복기 루틴"],
    forWhom: ["조건식을 저장만 하고 끝나는 분", "진입 조건과 실패 조건을 분리하고 싶은 분"],
    hero: "조건식은 비법이 아니라 필터입니다.",
    detailDescription: "이 전자책은 초보자가 조건식을 저장하는 단계에서 기록하고 복기하는 단계로 넘어가도록 설계했습니다.",
    notIncluded: ["종목 추천", "수익 보장", "실시간 매수/매도 지시", "1:1 투자 상담"]
  },
  {
    slug: "premium-notes",
    type: "프리미엄 노트",
    name: "프리미엄 조건식 사례 노트",
    priceLabel: "5,900원부터",
    shortDescription: "인스타에 없는 조건식 성공/실패 사례와 복기표",
    href: "/products/premium-notes",
    cta: "프리미엄 노트 보기",
    featured: true,
    includes: ["조건식 성공/실패 사례", "실패 조건", "복기표", "진입 전 체크리스트", "하지 말아야 할 패턴"],
    forWhom: ["인스타 글보다 자세한 사례가 필요한 분", "실패 조건을 더 많이 보고 싶은 분"],
    hero: "인스타에 올리지 않는 조건식 복기 사례를 더 자세히 정리합니다.",
    detailDescription: "짧은 게시글에서 다루기 어려운 조건식 복기 사례와 기록표를 프리미엄 노트로 정리합니다.",
    notIncluded: ["종목 추천", "수익 보장", "실시간 매수/매도 지시", "리딩방"]
  },
  {
    slug: "web-tools",
    type: "기능웹",
    name: "매매기록 기능웹",
    priceLabel: "무료 시작 / 프리미엄 예정",
    shortDescription: "조건식 기록, 손익비 계산, 관심종목 색상 분류",
    href: "/products/web-tools",
    cta: "기능웹 보기",
    featured: true,
    includes: ["손익비 계산기", "관심종목 색상 분류", "모의투자 기록장", "조건식 카드 저장"],
    forWhom: ["기록을 웹에서 바로 남기고 싶은 분", "조건식과 복기를 한 흐름으로 묶고 싶은 분"],
    hero: "기록하지 않는 조건식은 사라집니다.",
    detailDescription: "조건식, 관심종목, 모의투자, 복기를 웹에서 남기도록 돕는 기능웹입니다.",
    notIncluded: ["자동매매", "거래소 API 키 연결", "실시간 타점", "종목 리딩"]
  },
  {
    slug: "mock-league",
    type: "모의투자",
    name: "모의투자 리그 얼리버드",
    priceLabel: "7,000원",
    shortDescription: "수익률보다 진입 근거와 복기 성실도를 평가하는 교육형 실험 리그",
    href: "/products/mock-league",
    cta: "리그 보기",
    featured: true,
    includes: ["리그 사전 알림", "기록표", "평가 기준 안내", "복기 루틴 가이드"],
    forWhom: ["혼자 하면 기록이 밀리는 분", "기준 준수와 복기 성실도를 함께 보고 싶은 분"],
    hero: "수익률만 보는 대회가 아닙니다.",
    detailDescription: "진입 근거, 손절 준수, 복기 성실도까지 기록하는 교육형 실험 리그입니다.",
    notIncluded: ["실제 투자대회", "상금형 수익률 경쟁", "레버리지 유도", "종목 추천"]
  },
  {
    slug: "course",
    type: "강의",
    name: "4주 조건식 실험반",
    priceLabel: "사전수요 조사",
    shortDescription: "전자책보다 직접적인 4주 커리큘럼",
    href: "/products/course",
    cta: "강의 대기 신청",
    featured: false,
    includes: ["1주차: 조건식 기본 구조", "2주차: 거래량/전고점/테마 필터", "3주차: 실패 조건과 손절 기준", "4주차: 모의투자 복기와 루틴화"],
    forWhom: ["혼자 전자책을 읽기 어려운 분", "4주 동안 루틴을 같이 정리하고 싶은 분"],
    hero: "전자책을 혼자 읽기 어렵다면, 4주 동안 같이 정리합니다.",
    detailDescription: "조건식 구조부터 실패 조건, 모의투자 복기까지 4주 커리큘럼으로 수요를 확인합니다.",
    notIncluded: ["종목 추천", "실시간 매매 지시", "1:1 자산 상담", "수익 보장"]
  },
  {
    slug: "app",
    type: "앱",
    name: "모바일 앱 베타",
    priceLabel: "대기 신청",
    shortDescription: "웹 기능을 휴대폰에서 더 빠르게",
    href: "/products/app",
    cta: "앱 베타 신청",
    featured: false,
    includes: ["조건식 카드 저장", "관심종목 색상 분류", "모의투자 기록", "매매 전 체크리스트", "AI 조건식 정리", "프리미엄 글 알림"],
    forWhom: ["웹 기능을 모바일에서 쓰고 싶은 분", "장중 체크리스트를 빠르게 열고 싶은 분"],
    hero: "웹에서 검증된 기능을 모바일로 옮깁니다.",
    detailDescription: "웹에서 자주 쓰는 기능을 확인한 뒤 모바일 앱으로 옮기기 위한 베타 대기 페이지입니다.",
    notIncluded: ["자동매매", "거래 계정 연결", "실시간 타점 알림", "카피트레이딩"]
  }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const flagshipProduct = products.find((product) => product.slug === "ebook")!;
