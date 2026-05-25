import { NextResponse } from "next/server";
import { insertRow } from "@/lib/supabase/server";
import { formatZodError, eventSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = eventSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: formatZodError(parsed.error) }, { status: 400 });
  }

  const input = parsed.data;
  await insertRow("events", {
    event_name: input.eventName,
    anonymous_id: input.anonymousId || null,
    email: input.email || null,
    path: input.path || null,
    source: input.source || null,
    persona: input.persona || null,
    properties: input.properties || {}
  });

  return NextResponse.json({ ok: true });
}
