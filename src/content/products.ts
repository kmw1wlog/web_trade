export type Product = {
  slug: string;
  name: string;
  price: string;
  type: "one_time" | "subscription";
  description: string;
  includes: string[];
  forWhom: string[];
};

export const productDisclaimer =
  "본 상품은 투자 추천이나 수익 보장을 제공하지 않습니다. 조건식 학습, 모의투자, 기록·복기 목적의 교육 콘텐츠입니다.";

export const products: Product[] = [
  {
    slug: "premium-article-pack",
    name: "프리미엄 조건식 사례 5개",
    price: "5,900원",
    type: "one_time",
    description: "성공/실패 조건식 사례와 복기표",
    includes: ["조건식 사례 5개", "실패 조건 해설", "복기 질문 템플릿"],
    forWhom: ["성공담보다 실패 기준이 궁금한 분", "짧은 프리미엄 글로 실험 관점을 잡고 싶은 분"]
  },
  {
    slug: "ebook-beta",
    name: "조건식 실험노트 전자책 베타",
    price: "14,900원",
    type: "one_time",
    description: "조건식 구조, 실패 조건, 기록 루틴 PDF",
    includes: ["조건식 구조 설명", "실패 조건 기록법", "일일 루틴 PDF"],
    forWhom: ["조건식 실험을 처음 체계화하는 분", "전자책 형태로 천천히 따라가고 싶은 분"]
  },
  {
    slug: "premium-pass",
    name: "프리미엄 패스",
    price: "월 6,900원",
    type: "subscription",
    description: "프리미엄 글, 기록 템플릿, 기능웹 베타 접근",
    includes: ["프리미엄 글", "기록 템플릿", "기능웹 베타 접근"],
    forWhom: ["계속 업데이트되는 기록 자료가 필요한 분", "기능웹 베타를 먼저 써보고 싶은 분"]
  },
  {
    slug: "mock-league-earlybird",
    name: "모의투자 리그 얼리버드",
    price: "7,000원",
    type: "one_time",
    description: "교육형 모의투자 리그 사전예약",
    includes: ["리그 사전 알림", "기록표", "평가 기준 안내"],
    forWhom: ["혼자 기록을 지속하기 어려운 분", "수익률만이 아닌 기준 준수 평가를 경험하고 싶은 분"]
  }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
