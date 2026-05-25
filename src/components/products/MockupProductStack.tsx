export function MockupProductStack() {
  const cards = [
    ["조건식 실험노트 전자책", "14,900원", "조건식 구조와 실패 조건 PDF"],
    ["프리미엄 사례 노트", "5,900원부터", "인스타에 없는 조건식 복기 사례"],
    ["모의투자 기록 웹툴", "무료 시작", "진입 근거와 손절 기준 기록"]
  ];

  return (
    <div className="relative min-h-[360px] md:min-h-[440px]">
      {cards.map(([title, price, desc], index) => (
        <div
          key={title}
          className="absolute left-1/2 w-[82%] max-w-sm -translate-x-1/2 rounded-lg border border-line bg-white p-5 shadow-soft"
          style={{ top: `${index * 86}px`, transform: `translateX(-50%) rotate(${index === 0 ? -4 : index === 1 ? 2 : -1}deg)` }}
        >
          <p className="text-xs font-bold text-gold">스케일링 상품</p>
          <h3 className="mt-3 font-display text-2xl font-black leading-tight text-navy">{title}</h3>
          <p className="mt-4 text-2xl font-black text-charcoal">{price}</p>
          <p className="mt-2 text-sm leading-6 text-muted">{desc}</p>
          <div className="mt-5 h-2 rounded-full bg-cream">
            <div className="h-2 rounded-full bg-green" style={{ width: `${68 + index * 10}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
