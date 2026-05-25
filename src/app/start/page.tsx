import { PersonaCard } from "@/components/cards/PersonaCard";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { HeroSection } from "@/components/site/HeroSection";
import { personas } from "@/content/personas";

export const metadata = { title: "처음 오셨다면 | 조건식실험실" };

export default function StartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <HeroSection
        title="처음이라면, 내 상황에 맞는 실험 루트부터 고르세요."
        description="20대, 30대, 4050, AI/도구형, 조건식 관심자 흐름으로 무료 자료와 도구를 연결합니다."
        ctas={[{ label: "무료 자료실", href: "/free" }, { label: "조건식 글 보기", href: "/articles", variant: "secondary" }]}
      />
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {personas.map((persona) => (
          <PersonaCard key={persona.slug} persona={persona} />
        ))}
      </div>
      <div className="mt-8">
        <DisclosureBanner />
      </div>
    </div>
  );
}
