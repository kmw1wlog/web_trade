import Link from "next/link";

export const metadata = { title: "신청 완료 | 조건식실험실" };

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <p className="text-sm font-bold text-clay">완료</p>
      <h1 className="mt-3 font-display text-5xl font-bold text-ink">결제 또는 신청이 접수되었습니다.</h1>
      <p className="mt-5 leading-7 text-ink/70">결제 webhook 반영 전일 수 있어 결제 확인 중 상태가 표시될 수 있습니다. 확인이 끝나면 안내 메일 또는 후속 페이지로 연결됩니다.</p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper">홈으로 돌아가기</Link>
    </div>
  );
}
