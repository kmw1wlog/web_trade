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
        variant === "primary" && "bg-navy text-white hover:bg-green",
        variant === "secondary" && "border border-navy bg-white text-navy hover:bg-cream",
        variant === "ghost" && "border border-line text-navy hover:bg-cream",
        className
      )}
    >
      {children}
    </Link>
  );
}
