"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function TrackedLink({
  href,
  eventName,
  properties,
  className,
  children
}: {
  href: string;
  eventName: string;
  properties?: Record<string, unknown>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={() => trackEvent(eventName, properties)}
      className={cn("inline-flex items-center justify-center", className)}
    >
      {children}
    </Link>
  );
}
