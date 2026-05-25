import crypto from "crypto";
import { absoluteUrl } from "@/lib/utils";

const productEnvMap: Record<string, string> = {
  ebook: "CREEM_PRODUCT_EBOOK_BETA",
  "premium-notes": "CREEM_PRODUCT_PREMIUM_ARTICLE_PACK",
  "web-tools": "CREEM_PRODUCT_PREMIUM_PASS",
  "mock-league": "CREEM_PRODUCT_MOCK_LEAGUE_EARLYBIRD",
  "ebook-beta": "CREEM_PRODUCT_EBOOK_BETA",
  "premium-article-pack": "CREEM_PRODUCT_PREMIUM_ARTICLE_PACK",
  "premium-pass": "CREEM_PRODUCT_PREMIUM_PASS",
  "mock-league-earlybird": "CREEM_PRODUCT_MOCK_LEAGUE_EARLYBIRD"
};

export function getCreemProductId(productSlug: string): string | null {
  const key = productEnvMap[productSlug];
  if (!key) return null;
  return process.env[key] || null;
}

export async function createCheckoutSession(input: {
  productSlug: string;
  email?: string;
  source?: string;
  persona?: string;
  utm?: Record<string, unknown>;
}): Promise<{ checkoutUrl: string | null; fallback: boolean; checkoutId?: string }> {
  const apiKey = process.env.CREEM_API_KEY;
  const productId = getCreemProductId(input.productSlug);

  if (!apiKey || !productId) {
    return { checkoutUrl: null, fallback: true };
  }

  const response = await fetch("https://api.creem.io/v1/checkouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey
    },
    body: JSON.stringify({
      product_id: productId,
      customer: input.email ? { email: input.email } : undefined,
      success_url: absoluteUrl(`/success?product=${input.productSlug}`),
      metadata: {
        productSlug: input.productSlug,
        email: input.email,
        source: input.source,
        persona: input.persona,
        utm: input.utm
      },
      test_mode: process.env.CREEM_TEST_MODE !== "false"
    })
  });

  if (!response.ok) {
    console.warn("[creem] checkout creation failed", await response.text());
    return { checkoutUrl: null, fallback: true };
  }

  const data = (await response.json()) as { checkout_url?: string; url?: string; id?: string };
  return {
    checkoutUrl: data.checkout_url || data.url || null,
    checkoutId: data.id,
    fallback: !data.checkout_url && !data.url
  };
}

export function verifyCreemSignature(rawBody: string, signature: string, secret: string): boolean {
  if (!signature || !secret) return false;
  const digest = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const provided = signature.startsWith("sha256=") ? signature.slice(7) : signature;

  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(provided));
  } catch {
    return false;
  }
}
