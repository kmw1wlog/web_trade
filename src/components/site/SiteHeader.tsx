import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { navItems } from "@/content/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-ink">
          <span className="rounded-full bg-moss p-2 text-paper">
            <FlaskConical size={18} />
          </span>
          조건식실험실
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-ink/70 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/free" className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:bg-moss">
          무료 자료
        </Link>
      </div>
    </header>
  );
}
