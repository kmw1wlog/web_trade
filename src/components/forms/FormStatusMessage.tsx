export function FormStatusMessage({ status }: { status?: { type: "success" | "error" | "info"; message: string } }) {
  if (!status) return null;

  const color = status.type === "success" ? "border-moss/30 bg-moss/10 text-moss" : status.type === "error" ? "border-clay/35 bg-clay/10 text-clay" : "border-slateblue/30 bg-slateblue/10 text-slateblue";

  return <p className={`rounded-2xl border px-4 py-3 text-sm ${color}`}>{status.message}</p>;
}
