import { DisclosureBanner } from "@/components/site/DisclosureBanner";

export function ToolShell({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-sm font-semibold text-clay">기능웹</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">{title}</h1>
      <p className="mt-4 text-ink/70">{description}</p>
      <div className="mt-8">{children}</div>
      <div className="mt-8">
        <DisclosureBanner />
      </div>
    </div>
  );
}
