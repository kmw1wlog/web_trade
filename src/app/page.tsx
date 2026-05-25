import Link from "next/link";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { PersonaCard } from "@/components/cards/PersonaCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { HeroSection } from "@/components/site/HeroSection";
import { articles } from "@/content/articles";
import { personas } from "@/content/personas";
import { products } from "@/content/products";
import { resources } from "@/content/resources";
import { site } from "@/content/site";
import { toolItems } from "@/content/navigation";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <HeroSection
        title={site.tagline}
        description={site.description}
        ctas={[
          { label: "무료 자료 보기", href: "/free" },
          { label: "조건식 글 보기", href: "/articles", variant: "secondary" },
          { label: "모의투자 기록하기", href: "/tools/trade-journal", variant: "secondary" }
        ]}
      />

      <Section title="인스타에서 오셨나요?" description="댓글/DM으로 받은 키워드 자료를 여기서 이어서 볼 수 있습니다.">
        <div className="grid gap-3 md:grid-cols-5">
          {resources.map((resource) => (
            <Link key={resource.slug} href={`/free?resource=${resource.slug}`} className="rounded-2xl bg-white/70 p-4 text-sm font-bold text-ink shadow-sm">
              {resource.keyword} → {resource.title}
            </Link>
          ))}
        </div>
      </Section>

      <Section title="처음 온 사람을 위한 분기" description="상황에 맞는 자료와 도구로 바로 이동하세요.">
        <div className="grid gap-4 md:grid-cols-4">
          {personas.map((persona) => (
            <PersonaCard key={persona.slug} persona={persona} />
          ))}
        </div>
      </Section>

      <Section title="인기 글" description="조건식은 신호가 아니라 관찰 필터입니다. 글에서 기준을 먼저 잡아보세요.">
        <div className="grid gap-4 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Section>

      <Section title="무료 자료" description="실제 PDF는 MVP 이후 업로드 예정이며, 현재는 신청 흐름과 관심도를 측정합니다.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.slug} resource={resource} />
          ))}
        </div>
      </Section>

      <Section title="기능웹" description="조건식 실험을 기록 가능한 행동으로 바꾸는 작은 도구들입니다.">
        <div className="grid gap-4 md:grid-cols-3">
          {toolItems.map((tool) => (
            <Link key={tool.href} href={tool.href} className="rounded-3xl border border-ink/10 bg-white/70 p-5 transition hover:-translate-y-1 hover:shadow-soft">
              <h3 className="font-display text-2xl font-bold">{tool.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/70">{tool.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="유료 아이템" description="추천이나 리딩이 아니라 실패 기준과 기록 루틴을 더 깊게 다룹니다.">
        <div className="grid gap-4 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      <Section title="사전수요" description="앱, 강의, API, 모의투자 리그는 대기 신청으로 먼저 수요를 확인합니다.">
        <div className="grid gap-3 md:grid-cols-4">
          {[
            ["앱 베타", "/app"],
            ["강의 사전예약", "/course"],
            ["API 수요조사", "/api-product"],
            ["모의투자 리그", "/mock"]
          ].map(([label, href]) => (
            <Link key={href} href={href} className="rounded-2xl bg-ink px-5 py-4 text-center text-sm font-bold text-paper">
              {label}
            </Link>
          ))}
        </div>
      </Section>

      <Section title="제휴 문의" description="MTS, 투자앱, 데이터, 교육, 커뮤니티 제휴를 열어둡니다.">
        <Link href="/partners" className="inline-flex rounded-full bg-clay px-5 py-3 text-sm font-bold text-paper">
          제휴 문의하기
        </Link>
      </Section>

      <div className="rounded-3xl border border-ink/10 bg-white/70 p-5">
        <p className="font-display text-2xl font-bold">코인 실험실은 별도 프로젝트로 준비 중입니다.</p>
        <p className="mt-2 text-sm text-ink/70">본 웹에는 깊게 통합하지 않고 관심 기능만 수집합니다.</p>
        <Link href="/crypto-gate" className="mt-4 inline-flex rounded-full border border-ink/15 px-5 py-3 text-sm font-bold text-ink">
          코인 게이트 보기
        </Link>
      </div>

      <div className="mt-8">
        <DisclosureBanner />
      </div>
    </div>
  );
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="py-10">
      <div className="mb-5">
        <h2 className="font-display text-3xl font-bold text-ink">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-ink/65">{description}</p>
      </div>
      {children}
    </section>
  );
}
