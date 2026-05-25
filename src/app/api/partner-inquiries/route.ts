import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase/server";
import { formatZodError, partnerInquirySchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = partnerInquirySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: formatZodError(parsed.error) }, { status: 400 });
  }

  const input = parsed.data;
  const result = await insertRow("partner_inquiries", {
    name: input.name || null,
    email: input.email,
    company: input.company || null,
    category: input.category || null,
    message: input.message,
    metadata: {}
  });

  await insertRow("events", {
    event_name: "partner_inquiry_submit",
    email: input.email,
    source: "partners",
    properties: { category: input.category, company: input.company }
  });

  return NextResponse.json({
    ok: true,
    fallback: result.skipped,
    message: result.skipped ? "현재 저장소 연결이 준비되지 않았지만 문의는 임시로 접수되었습니다." : "제휴 문의가 접수되었습니다."
  });
}
