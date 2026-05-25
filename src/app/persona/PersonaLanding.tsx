import { notFound } from "next/navigation";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import { CTAButton } from "@/components/site/CTAButton";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { HeroSection } from "@/components/site/HeroSection";
import { getPersona } from "@/content/personas";
import { getResource } from "@/content/resources";

export function PersonaLanding({ slug }: { slug: string }) {
  const persona = getPersona(slug);
  if (!persona) notFound();
  const resource = getResource(persona.resourceSlug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <HeroSection title={persona.hero} description={persona.description} ctas={persona.ctas.map((cta, index) => ({ ...cta, variant: index === 0 ? "primary" : "secondary" }))} />
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px]">
        <section className="rounded-3xl border border-ink/10 bg-white/75 p-6">
          <h2 className="font-display text-3xl font-bold">{persona.label} 추천 흐름</h2>
          <div className="mt-5 grid gap-3">
            {persona.links.map((link) => (
              <p key={link} className="rounded-2xl bg-paper px-4 py-3 text-sm font-semibold">{link}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {persona.ctas.map((cta) => (
              <CTAButton key={cta.href} href={cta.href} variant="ghost">
                {cta.label}
              </CTAButton>
            ))}
          </div>
        </section>
        {resource ? (
          <section className="rounded-3xl border border-ink/10 bg-white/75 p-6">
            <p className="text-sm font-bold text-clay">무료 자료</p>
            <h2 className="mt-2 font-display text-3xl font-bold">{resource.title}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/70">{resource.description}</p>
            <div className="mt-5">
              <LeadCaptureForm interest={resource.slug} keyword={resource.keyword} />
            </div>
          </section>
        ) : null}
      </div>
      <div className="mt-8">
        <DisclosureBanner />
      </div>
    </div>
  );
}
