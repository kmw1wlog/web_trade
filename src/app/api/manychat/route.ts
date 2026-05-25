import { NextResponse } from "next/server";
import { resources } from "@/content/resources";
import { getKeywordDestination, getResourceByKeyword } from "@/lib/resources";
import { insertRow } from "@/lib/supabase/server";
import { formatZodError, manychatSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const configuredSecret = process.env.MANYCHAT_WEBHOOK_SECRET;
  const requestSecret = request.headers.get("x-webhook-secret") || url.searchParams.get("secret");

  if (configuredSecret && requestSecret !== configuredSecret) {
    return NextResponse.json({ ok: false, message: "인증에 실패했습니다." }, { status: 401 });
  }

  const parsed = manychatSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: formatZodError(parsed.error) }, { status: 400 });
  }

  const input = parsed.data;
  const resource = getResourceByKeyword(input.keyword);
  const destination = getKeywordDestination(input.keyword);

  await insertRow("leads", {
    instagram_username: input.instagramUsername || null,
    source: input.source || "manychat",
    channel: input.channel || null,
    keyword: input.keyword || null,
    interest: resource?.slug || destination,
    metadata: { firstName: input.firstName, postId: input.postId, ref: input.ref }
  });

  if (resource) {
    return NextResponse.json({
      ok: true,
      resource: {
        title: resource.title,
        url: `/free?resource=${resource.slug}`
      }
    });
  }

  return NextResponse.json({
    ok: true,
    resource: {
      title: input.keyword === "API" ? "데이터/API 수요조사" : input.keyword === "코인" ? "코인 실험실 게이트" : "무료 자료실",
      url: resources.some((item) => item.keyword === input.keyword) ? destination : destination
    }
  });
}
