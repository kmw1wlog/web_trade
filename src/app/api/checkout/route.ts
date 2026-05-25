import { NextResponse } from "next/server";
import { getProduct } from "@/content/products";
import { createCheckoutSession } from "@/lib/creem";
import { insertRow } from "@/lib/supabase/server";
import { formatZodError, checkoutSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = checkoutSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: formatZodError(parsed.error) }, { status: 400 });
  }

  const input = parsed.data;
  const product = getProduct(input.productSlug);
  if (!product) {
    return NextResponse.json({ ok: false, message: "알 수 없는 상품입니다." }, { status: 400 });
  }

  const session = await createCheckoutSession(input);

  await insertRow("orders", {
    email: input.email || null,
    product_slug: input.productSlug,
    creem_checkout_id: session.checkoutId || null,
    status: session.fallback ? "waitlist_fallback" : "pending",
    amount: Number(product.priceLabel.replace(/[^0-9]/g, "")) || null,
    currency: "KRW",
    metadata: { source: input.source, persona: input.persona, utm: input.utm }
  });

  await insertRow("events", {
    event_name: "checkout_start",
    email: input.email || null,
    source: input.source || "store",
    persona: input.persona || null,
    properties: { productSlug: input.productSlug, fallback: session.fallback }
  });

  return NextResponse.json({
    ok: true,
    checkoutUrl: session.checkoutUrl,
    fallback: session.fallback,
    message: session.fallback ? "결제 준비 중입니다. 이메일을 남기면 오픈 시 알려드릴게요." : undefined
  });
}
