import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase/server";
import { formatZodError, mockTradeSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = mockTradeSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: formatZodError(parsed.error) }, { status: 400 });
  }

  const input = parsed.data;
  const result = await insertRow("mock_trades", {
    email: input.email || null,
    symbol: input.symbol,
    trade_date: input.tradeDate || null,
    direction: input.direction || "watch",
    condition_name: input.conditionName || null,
    entry_reason: input.entryReason,
    stop_rule: input.stopRule || null,
    target_rule: input.targetRule || null,
    result: input.result || null,
    review: input.review || null,
    emotion: input.emotion || null,
    persona: input.persona || null,
    source: input.source || "trade_journal",
    metadata: {}
  });

  await insertRow("events", {
    event_name: "mock_trade_submit",
    email: input.email || null,
    source: input.source || "trade_journal",
    persona: input.persona || null,
    properties: { symbol: input.symbol, direction: input.direction || "watch" }
  });

  return NextResponse.json({
    ok: true,
    fallback: result.skipped,
    message: result.skipped ? "현재 저장소 연결이 준비되지 않았지만 기록은 임시로 접수되었습니다." : "모의투자 기록이 저장되었습니다."
  });
}
