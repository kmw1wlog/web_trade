import Link from "next/link";

export function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-3 py-3 shadow-[0_-14px_30px_rgba(21,23,26,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-sm grid-cols-2 gap-2">
        <Link href="/products/ebook" className="rounded-lg bg-navy px-3 py-3 text-center text-sm font-bold text-white">
          전자책 보기
        </Link>
        <Link href="/products/premium-notes" className="rounded-lg border border-navy bg-white px-3 py-3 text-center text-sm font-bold text-navy">
          프리미엄 노트
        </Link>
      </div>
    </div>
  );
}
