export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-ink/20 bg-white/50 p-8 text-center">
      <p className="font-display text-2xl font-bold text-ink">{title}</p>
      <p className="mt-2 text-sm text-ink/65">{description}</p>
    </div>
  );
}
