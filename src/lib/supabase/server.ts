import { createClient } from "@supabase/supabase-js";

function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabaseServiceClient() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export async function insertRow(table: string, row: Record<string, unknown>) {
  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    console.warn(`[supabase] ${table} insert skipped: env is not configured`);
    return { skipped: true, error: null };
  }

  const { error } = await supabase.from(table).insert(row);
  if (error) {
    console.warn(`[supabase] ${table} insert failed`, error.message);
  }
  return { skipped: false, error };
}

export async function updateOrderByCheckoutId(checkoutId: string, status: string, metadata: Record<string, unknown>) {
  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    console.warn("[supabase] order update skipped: env is not configured");
    return;
  }

  await supabase
    .from("orders")
    .update({ status, metadata, updated_at: new Date().toISOString() })
    .eq("creem_checkout_id", checkoutId);
}

export async function getAdminSummary() {
  const supabase = getSupabaseServiceClient();
  if (!supabase) return null;

  const tables = ["leads", "waitlists", "mock_trades", "orders", "partner_inquiries", "events"];
  const counts = Object.fromEntries(await Promise.all(tables.map(async (table) => {
    const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
    return [table, count ?? 0];
  }))) as Record<string, number>;

  const { data: leads } = await supabase
    .from("leads")
    .select("email, instagram_username, source, keyword, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  const { data: waitlists } = await supabase
    .from("waitlists")
    .select("email, type, selected_options, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  return { counts, leads: leads ?? [], waitlists: waitlists ?? [] };
}
