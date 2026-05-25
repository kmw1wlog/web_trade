import { CTAButton } from "@/components/site/CTAButton";

export function HeroSection({
  title,
  description,
  ctas = []
}: {
  title: string;
  description: string;
  ctas?: { label: string; href: string; variant?: "primary" | "secondary" }[];
}) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-ink px-5 py-14 text-paper shadow-soft md:px-12 md:py-20">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-clay/40 blur-3xl" />
      <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-moss/60 blur-3xl" />
      <div className="relative max-w-3xl">
        <p className="mb-4 inline-flex rounded-full border border-paper/20 px-3 py-1 text-sm text-paper/80">
          교육·기록·모의투자 플랫폼
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-paper/78 md:text-lg">{description}</p>
        {ctas.length > 0 ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {ctas.map((cta) => (
              <CTAButton key={cta.href} href={cta.href} variant={cta.variant}>
                {cta.label}
              </CTAButton>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
