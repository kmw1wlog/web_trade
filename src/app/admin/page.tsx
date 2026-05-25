import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StatCard } from "@/components/cards/StatCard";
import { EmptyState } from "@/components/cards/EmptyState";
import { getAdminSummary } from "@/lib/supabase/server";
import { maskEmail } from "@/lib/utils";

export const metadata = { title: "관리자 | 조건식실험실" };

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") || "");
  if (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) {
    cookies().set("condition_lab_admin", "ok", { httpOnly: true, sameSite: "lax", path: "/" });
  }
  redirect("/admin");
}

export default async function AdminPage() {
  if (!process.env.ADMIN_PASSWORD) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState title="관리자 기능이 비활성화되어 있습니다." description="ADMIN_PASSWORD 환경변수를 설정하면 관리자 요약이 활성화됩니다." />
      </div>
    );
  }

  const authed = cookies().get("condition_lab_admin")?.value === "ok";
  if (!authed) {
    return (
      <div className="mx-auto max-w-sm px-4 py-16">
        <form action={login} className="grid gap-4 rounded-3xl border border-ink/10 bg-white/75 p-5">
          <h1 className="font-display text-3xl font-bold">관리자 로그인</h1>
          <input name="password" type="password" className="rounded-2xl border border-ink/15 px-4 py-3 text-sm" placeholder="비밀번호" />
          <button className="rounded-2xl bg-ink px-4 py-3 text-sm font-bold text-paper">확인</button>
        </form>
      </div>
    );
  }

  const summary = await getAdminSummary();
  if (!summary) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState title="Supabase 연결이 없습니다." description="환경변수를 설정하면 leads, waitlists, orders 등의 count가 표시됩니다." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold">관리자 요약</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {Object.entries(summary.counts).map(([table, count]) => (
          <StatCard key={table} label={table} value={count} />
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-ink/10 bg-white/75 p-5">
          <h2 className="font-display text-2xl font-bold">최근 leads</h2>
          <div className="mt-4 grid gap-3 text-sm">
            {summary.leads.map((lead) => (
              <p key={`${lead.email}-${lead.created_at}`} className="rounded-2xl bg-paper px-4 py-3">
                {maskEmail(lead.email)} · {lead.keyword || "키워드 없음"} · {lead.source || "source 없음"}
              </p>
            ))}
          </div>
        </section>
        <section className="rounded-3xl border border-ink/10 bg-white/75 p-5">
          <h2 className="font-display text-2xl font-bold">최근 waitlists</h2>
          <div className="mt-4 grid gap-3 text-sm">
            {summary.waitlists.map((item) => (
              <p key={`${item.email}-${item.created_at}`} className="rounded-2xl bg-paper px-4 py-3">
                {maskEmail(item.email)} · {item.type}
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
