import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold">투자도구 허브</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
            투자도구 허브는 투자 추천, 종목 리딩, 자산 운용, 일임, 수익 보장 서비스를 제공하지 않습니다.
            모든 자료는 교육·기록·모의투자 목적입니다.
          </p>
        </div>
        <div className="grid gap-2 text-sm">
          <Link href="/products">상품</Link>
          <Link href="/blog">웹블로그</Link>
          <Link href="/tools">기능웹</Link>
          <Link href="/disclosure">투자 유의사항</Link>
          <Link href="/privacy">개인정보 처리방침</Link>
          <Link href="/terms">이용약관</Link>
        </div>
        <div className="grid gap-2 text-sm">
          <Link href="/partners">제휴 문의</Link>
          <Link href="/crypto-gate">별도 프로젝트: 코인 실험실 준비 중</Link>
          <Link href="/admin">관리자</Link>
        </div>
      </div>
    </footer>
  );
}
