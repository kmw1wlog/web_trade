export function EbookMockup() {
  return (
    <div className="mx-auto max-w-sm rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="aspect-[4/5] rounded-lg bg-navy p-6 text-white">
        <p className="text-sm font-bold text-gold">BETA PDF</p>
        <h3 className="mt-8 font-display text-4xl font-black leading-tight">조건식 실험노트</h3>
        <p className="mt-5 text-sm leading-6 text-white/75">진입 조건, 실패 조건, 복기 기준을 한 권으로 정리합니다.</p>
        <div className="mt-12 grid gap-2 text-xs text-white/70">
          <span>거래량 실패 사례</span>
          <span>전일 고점 체크리스트</span>
          <span>하루 10분 복기 루틴</span>
        </div>
      </div>
    </div>
  );
}
