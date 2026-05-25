export type Persona = {
  slug: "20s" | "30s" | "4050" | "ai";
  label: string;
  hero: string;
  description: string;
  ctas: { label: string; href: string }[];
  resourceSlug: string;
  links: string[];
};

export const personas: Persona[] = [
  {
    slug: "20s",
    label: "20대",
    hero: "투자 처음 시작했다면, 비법보다 기록 습관부터.",
    description: "대학생·사회초년생을 위한 조건식 실험노트와 모의투자 기록표를 제공합니다.",
    ctas: [
      { label: "초보 조건식 자료 받기", href: "/free?resource=condition-note" },
      { label: "모의투자 기록하기", href: "/tools/trade-journal" },
      { label: "앱 베타 신청", href: "/app" }
    ],
    resourceSlug: "condition-note",
    links: ["전자책 베타", "앱 사전예약", "모의투자 리그"]
  },
  {
    slug: "30s",
    label: "30대",
    hero: "퇴근 후 10분, 차트를 오래 보는 대신 기준을 남깁니다.",
    description: "직장인을 위한 조건식 복기 루틴, 프리미엄 사례, 강의 사전예약을 확인하세요.",
    ctas: [
      { label: "복기표 받기", href: "/free?resource=daily-review-checklist" },
      { label: "프리미엄 사례 보기", href: "/store/premium-article-pack" },
      { label: "강의 사전예약", href: "/course" }
    ],
    resourceSlug: "daily-review-checklist",
    links: ["프리미엄 글", "전자책", "기능웹", "강의"]
  },
  {
    slug: "4050",
    label: "4050",
    hero: "복잡한 차트보다 먼저, 관심종목을 색으로 정리하세요.",
    description: "4050 투자자를 위한 차트 색상 세팅, 조건식 체크리스트, 기초 강의 수요조사 페이지입니다.",
    ctas: [
      { label: "색상 세팅 가이드 받기", href: "/free?resource=color-setting" },
      { label: "전자책 보기", href: "/store/ebook-beta" },
      { label: "기초반 강의 신청", href: "/course" }
    ],
    resourceSlug: "color-setting",
    links: ["전자책", "강의", "프리미엄 글"]
  },
  {
    slug: "ai",
    label: "AI/도구형",
    hero: "AI로 조건식을 대신 만들기보다, 먼저 질문을 정리합니다.",
    description: "AI 조건식 프롬프트, 기록 자동화, 앱/API 베타 수요조사를 확인하세요.",
    ctas: [
      { label: "AI 프롬프트 받기", href: "/free?resource=condition-note" },
      { label: "기능웹 써보기", href: "/tools" },
      { label: "API 베타 신청", href: "/api-product" }
    ],
    resourceSlug: "condition-note",
    links: ["기능웹", "앱 베타", "API 수요조사"]
  }
];

export function getPersona(slug: string) {
  return personas.find((persona) => persona.slug === slug);
}
