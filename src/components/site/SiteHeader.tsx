import Link from "next/link";
import { Menu } from "lucide-react";
import { TrackedLink } from "@/components/home/TrackedLink";
import { navItems } from "@/content/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-lg font-bold text-navy">
          루틴스케일링
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-muted md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-navy">
              {item.label}
            </Link>
          ))}
        </nav>
        <TrackedLink href="/tools/cvd" eventName="web_tool_try_click" properties={{ location: "header", tool: "cvd" }} className="hidden rounded-lg bg-navy px-4 py-2 text-sm font-bold text-white transition hover:bg-green md:inline-flex">
          CVD 차트 체험
        </TrackedLink>
        <details className="relative md:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-line text-navy">
            <Menu size={19} />
          </summary>
          <div className="absolute right-0 mt-3 grid w-56 gap-1 rounded-lg border border-line bg-white p-2 shadow-soft">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-semibold text-navy hover:bg-cream">
                {item.label}
              </Link>
            ))}
            <TrackedLink href="/tools/cvd" eventName="web_tool_try_click" properties={{ location: "mobile_menu", tool: "cvd" }} className="rounded-md bg-navy px-3 py-2 text-sm font-bold text-white">
              CVD 차트 체험
            </TrackedLink>
          </div>
        </details>
      </div>
    </header>
  );
}
