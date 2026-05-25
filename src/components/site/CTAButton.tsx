import Link from "next/link";
import { cn } from "@/lib/utils";

export function CTAButton({
  href,
  children,
  variant = "primary",
  className
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition",
        variant === "primary" && "bg-clay text-paper hover:bg-clay/90",
        variant === "secondary" && "bg-paper text-ink hover:bg-oat",
        variant === "ghost" && "border border-ink/15 text-ink hover:bg-oat/60",
        className
      )}
    >
      {children}
    </Link>
  );
}
