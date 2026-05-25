export type Resource = {
  slug: string;
  title: string;
  keyword: string;
  description: string;
  audience: string;
};

export const resources: Resource[] = [
  {
    slug: "condition-note",
    title: "초보 단타 조건식 실험노트",
    keyword: "조건",
    description: "조건식 이름, 진입 근거, 제외 기준, 복기 항목을 한 장으로 정리합니다.",
    audience: "처음 조건식을 실험하는 분"
  },
  {
    slug: "color-setting",
    title: "급등주 화면 색상 세팅 가이드",
    keyword: "색상",
    description: "관심종목을 빨강, 파랑, 회색으로 나눠 관찰 목적을 분명하게 만듭니다.",
    audience: "차트와 관심종목이 복잡하게 느껴지는 분"
  },
  {
    slug: "volume-failure",
    title: "거래량 조건식 실패 사례 모음",
    keyword: "거래량",
    description: "거래량 급증 이후 실패하는 흐름을 복기용 체크리스트로 정리합니다.",
    audience: "거래량 조건식을 쓰지만 기준이 흔들리는 분"
  },
  {
    slug: "mock-trade-template",
    title: "모의투자 기록표",
    keyword: "모의투자",
    description: "종목, 조건식, 손절 기준, 결과, 감정을 같은 형식으로 남깁니다.",
    audience: "실전 전 기록 루틴을 만들고 싶은 분"
  },
  {
    slug: "daily-review-checklist",
    title: "하루 10분 복기 체크리스트",
    keyword: "복기",
    description: "퇴근 후 10분 안에 오늘의 관찰과 기준 준수 여부를 확인합니다.",
    audience: "시간이 부족한 직장인"
  }
];

export function getResource(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}
