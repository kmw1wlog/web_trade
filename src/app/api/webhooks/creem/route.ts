import { NextResponse } from "next/server";
import { updateOrderByCheckoutId } from "@/lib/supabase/server";
import { verifyCreemSignature } from "@/lib/creem";

const statusByEvent: Record<string, string> = {
  "checkout.completed": "paid",
  "subscription.active": "active",
  "subscription.paid": "active",
  "subscription.canceled": "canceled",
  "refund.created": "refunded",
  "dispute.created": "disputed"
};

export async function POST(request: Request) {
  const rawBody = await request.text();
  const secret = process.env.CREEM_WEBHOOK_SECRET;
  const signature = request.headers.get("creem-signature") || "";

  if (secret && !verifyCreemSignature(rawBody, signature, secret)) {
    return NextResponse.json({ ok: false, message: "서명 검증 실패" }, { status: 401 });
  }

  if (!secret) {
    console.warn("[creem] webhook signature verification skipped: CREEM_WEBHOOK_SECRET is not configured");
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: "잘못된 JSON입니다." }, { status: 400 });
  }

  const eventType = String(event.type || event.event_type || "unknown");
  const status = statusByEvent[eventType];
  const object = (event.object || event.data || {}) as Record<string, unknown>;
  const checkoutId = String(object.checkout_id || object.checkoutId || object.id || "");

  if (status && checkoutId) {
    await updateOrderByCheckoutId(checkoutId, status, event);
  } else {
    console.warn("[creem] unhandled webhook", eventType);
  }

  return NextResponse.json({ ok: true });
}
