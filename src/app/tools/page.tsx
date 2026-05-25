import Link from "next/link";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { toolItems } from "@/content/navigation";

export const metadata = { title: "기능웹 | 조건식실험실" };

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold text-ink">기능웹</h1>
      <p className="mt-3 text-ink/70">조건식 실험과 모의투자 기록을 돕는 작은 도구입니다.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {toolItems.map((tool) => (
          <Link key={tool.href} href={tool.href} className="rounded-3xl border border-ink/10 bg-white/75 p-5 transition hover:-translate-y-1 hover:shadow-soft">
            <h2 className="font-display text-2xl font-bold">{tool.title}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/70">{tool.description}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <DisclosureBanner />
      </div>
    </div>
  );
}
