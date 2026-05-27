import { TrackedLink } from "@/components/home/TrackedLink";

export function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-3 py-3 shadow-[0_-14px_30px_rgba(21,23,26,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-sm grid-cols-2 gap-2">
        <TrackedLink href="/#coupon" eventName="coupon_claim_click" properties={{ location: "sticky_cta" }} className="rounded-lg bg-navy px-3 py-3 text-center text-sm font-bold text-white">
          무료 쿠폰
        </TrackedLink>
        <TrackedLink href="/#tools-preview" eventName="web_tool_try_click" properties={{ location: "sticky_cta" }} className="rounded-lg border border-navy bg-white px-3 py-3 text-center text-sm font-bold text-navy">
          기능 체험
        </TrackedLink>
      </div>
      <TrackedLink href="/#app-beta" eventName="app_beta_click" properties={{ location: "sticky_cta" }} className="mt-2 flex text-center text-xs font-bold text-green">
        앱 베타
      </TrackedLink>
    </div>
  );
}
