import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase/server";
import { formatZodError, leadSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = leadSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: formatZodError(parsed.error) }, { status: 400 });
  }

  const input = parsed.data;
  const result = await insertRow("leads", {
    email: input.email || null,
    instagram_username: input.instagramUsername || null,
    source: input.source || null,
    channel: input.channel || null,
    persona: input.persona || null,
    keyword: input.keyword || null,
    interest: input.interest || null,
    utm_source: input.utm?.source || null,
    utm_medium: input.utm?.medium || null,
    utm_campaign: input.utm?.campaign || null,
    utm_content: input.utm?.content || null,
    metadata: input.metadata || {}
  });

  await insertRow("events", {
    event_name: "lead_submit",
    email: input.email || null,
    source: input.source || null,
    persona: input.persona || null,
    properties: { keyword: input.keyword, interest: input.interest }
  });

  return NextResponse.json({
    ok: true,
    fallback: result.skipped,
    message: result.skipped ? "현재 저장소 연결이 준비되지 않았지만 신청은 임시로 접수되었습니다." : "자료 신청이 접수되었습니다."
  });
}
