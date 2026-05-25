import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase/server";
import { formatZodError, waitlistSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = waitlistSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: formatZodError(parsed.error) }, { status: 400 });
  }

  const input = parsed.data;
  const utm = input.utm as { source?: string; medium?: string; campaign?: string } | undefined;
  const result = await insertRow("waitlists", {
    email: input.email,
    type: input.type,
    selected_options: input.selectedOptions || [],
    persona: input.persona || null,
    source: input.source || null,
    utm_source: utm?.source || null,
    utm_medium: utm?.medium || null,
    utm_campaign: utm?.campaign || null,
    metadata: input.metadata || {}
  });

  await insertRow("events", {
    event_name: "waitlist_submit",
    email: input.email,
    source: input.source || null,
    persona: input.persona || null,
    properties: { type: input.type, selectedOptions: input.selectedOptions || [] }
  });

  return NextResponse.json({
    ok: true,
    fallback: result.skipped,
    message: result.skipped ? "현재 저장소 연결이 준비되지 않았지만 신청은 임시로 접수되었습니다." : "대기 신청이 접수되었습니다."
  });
}
