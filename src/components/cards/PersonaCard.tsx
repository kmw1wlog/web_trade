import Link from "next/link";
import type { Persona } from "@/content/personas";

export function PersonaCard({ persona }: { persona: Persona }) {
  return (
    <Link href={`/persona/${persona.slug}`} className="rounded-3xl border border-ink/10 bg-white/70 p-5 transition hover:-translate-y-1 hover:shadow-soft">
      <p className="text-sm font-bold text-clay">{persona.label}</p>
      <h3 className="mt-3 font-display text-2xl font-bold text-ink">{persona.hero}</h3>
      <p className="mt-3 text-sm leading-6 text-ink/68">{persona.description}</p>
    </Link>
  );
}
