import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function maskEmail(email?: string | null) {
  if (!email || !email.includes("@")) return "미입력";
  const [name, domain] = email.split("@");
  const first = name.slice(0, 1) || "*";
  return `${first}**@${domain}`;
}

export function absoluteUrl(path = "") {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${base.replace(/\/$/, "")}${path}`;
}
