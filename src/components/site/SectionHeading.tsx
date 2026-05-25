export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      {eyebrow ? <p className="mb-3 text-sm font-bold text-gold">{eyebrow}</p> : null}
      <h2 className="font-display text-3xl font-black leading-tight text-navy md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-muted">{description}</p> : null}
    </div>
  );
}
