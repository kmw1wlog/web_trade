export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "조건식" | "복기" | "도구" | "모의투자" | "AI";
  persona: "20s" | "30s" | "4050" | "ai" | "all";
  tags: string[];
  readingMinutes: number;
  freeResourceSlug?: string;
  productSlug?: string;
  toolSlug?: string;
  body: string[];
};

const closing = "이 글은 교육, 모의투자, 복기 목적의 기록 자료이며 투자 판단을 대신하지 않습니다.";

export const articles: Article[] = [
  {
    slug: "volume-breakout-fail",
    title: "거래량 급증 조건식이 실패하는 이유",
    excerpt: "거래량 급증은 출발점일 뿐, 진입 근거가 되려면 실패 패턴까지 함께 기록해야 합니다.",
    category: "조건식",
    persona: "all",
    tags: ["거래량", "실패사례", "조건식"],
    readingMinutes: 4,
    freeResourceSlug: "volume-failure",
    productSlug: "premium-article-pack",
    toolSlug: "trade-journal",
    body: [
      "거래량 급증 조건식은 초보자가 가장 먼저 접하는 필터입니다. 문제는 거래량이 늘었다는 사실만으로 방향성이 확정되지 않는다는 데 있습니다.",
      "급증 이후 바로 밀리는 종목, 전고점 근처에서만 반짝이는 종목, 뉴스성 수급으로 끝나는 종목은 모두 같은 조건식 안에 함께 들어올 수 있습니다.",
      "그래서 조건식은 매수 신호가 아니라 관찰 대상을 줄이는 장치로 다뤄야 합니다. 조건식 이후에는 위치, 캔들, 손절 기준, 거래대금 지속성을 따로 확인해야 합니다.",
      "실패 사례를 모아보면 나만의 제외 기준이 생깁니다. 예를 들어 첫 5분 거래량만 크고 이후 체결이 끊기는 종목은 별도 색상으로 분류할 수 있습니다.",
      "기록의 목적은 맞힌 종목을 자랑하는 것이 아니라 다음 실험에서 제외할 조건을 발견하는 것입니다.",
      closing
    ]
  },
  {
    slug: "previous-high-breakout",
    title: "전일 고점 돌파를 볼 때 초보가 놓치는 것",
    excerpt: "전일 고점 돌파는 가격보다 맥락이 중요합니다. 돌파 전후의 눌림과 거래 지속성을 함께 봅니다.",
    category: "조건식",
    persona: "20s",
    tags: ["전일고점", "초보", "돌파"],
    readingMinutes: 5,
    freeResourceSlug: "condition-note",
    productSlug: "ebook-beta",
    toolSlug: "rr-calculator",
    body: [
      "전일 고점 돌파는 보기 쉽지만 실험하기는 까다로운 조건입니다. 고점을 넘는 순간이 아니라 그 전에 어떤 준비가 있었는지가 더 중요할 때가 많습니다.",
      "초보자는 돌파 가격만 보고 접근하기 쉽습니다. 하지만 전일 고점 위에서 버티지 못하고 바로 되밀리는 흐름도 흔합니다.",
      "돌파 전 거래대금이 누적됐는지, 눌림에서 저점이 높아졌는지, 돌파 후 손절 기준이 명확한지 먼저 적어야 합니다.",
      "조건식 실험노트에는 진입 전 예상 시나리오와 실패 시나리오를 같이 적습니다. 들어가기 전 손절 기준이 없다면 그 실험은 보류하는 편이 낫습니다.",
      "관찰한 차트가 많아질수록 돌파 자체보다 돌파 실패 조건이 더 선명해집니다.",
      closing
    ]
  },
  {
    slug: "red-blue-watchlist",
    title: "빨간 배경/파란 배경으로 관심종목 나누는 법",
    excerpt: "색상 분류는 감정적인 관심을 줄이고 관찰 목적을 분명하게 만드는 간단한 기록법입니다.",
    category: "도구",
    persona: "4050",
    tags: ["색상분류", "관심종목", "차트세팅"],
    readingMinutes: 3,
    freeResourceSlug: "color-setting",
    toolSlug: "color-classifier",
    body: [
      "관심종목이 많아질수록 머릿속 기준은 쉽게 섞입니다. 그래서 색상은 단순한 꾸미기가 아니라 관찰 목적을 남기는 도구가 됩니다.",
      "빨강은 급등하거나 강한 관심이 필요한 종목, 파랑은 눌림이나 재관찰 대상, 회색은 제외하거나 복기할 대상을 뜻하게 정합니다.",
      "중요한 점은 색을 바꾼 이유를 짧게라도 남기는 것입니다. 같은 빨강이라도 거래량, 뉴스, 돌파, 변동성 등 이유는 다를 수 있습니다.",
      "하루가 끝난 뒤 색을 다시 보면 내 관심이 어디로 쏠렸는지 확인할 수 있습니다. 이 과정이 복기의 시작점입니다.",
      "색상 분류는 종목 추천이 아니라 나만의 관찰 대장을 정리하는 방법입니다.",
      closing
    ]
  },
  {
    slug: "condition-is-filter",
    title: "단타 조건식은 비법이 아니라 필터다",
    excerpt: "조건식은 정답을 뽑는 기계가 아니라 복기할 대상을 줄이는 필터입니다.",
    category: "조건식",
    persona: "all",
    tags: ["필터", "전략실험", "기초"],
    readingMinutes: 4,
    freeResourceSlug: "condition-note",
    productSlug: "ebook-beta",
    body: [
      "조건식을 비법으로 이해하면 결과가 틀릴 때마다 새로운 조건식을 찾아다니게 됩니다.",
      "하지만 조건식은 시장 전체에서 관찰할 대상을 줄이는 필터에 가깝습니다. 필터를 통과한 뒤에야 진입 근거와 리스크 기준을 검토할 수 있습니다.",
      "좋은 조건식은 많이 맞히는 조건이 아니라 기록하기 좋은 조건입니다. 왜 들어왔고 왜 제외했는지 설명 가능해야 합니다.",
      "조건식 이름, 진입 근거, 손절 기준, 결과를 같은 형식으로 쌓으면 조건식의 장단점이 보이기 시작합니다.",
      "조건식을 실험 도구로 보면 실패도 데이터가 됩니다.",
      closing
    ]
  },
  {
    slug: "review-profitable-trades",
    title: "수익 난 매매도 복기해야 하는 이유",
    excerpt: "좋은 결과가 좋은 과정에서 나온 것인지 확인하지 않으면 다음 실험의 기준이 흐려집니다.",
    category: "복기",
    persona: "30s",
    tags: ["복기", "루틴", "직장인"],
    readingMinutes: 4,
    freeResourceSlug: "daily-review-checklist",
    productSlug: "premium-article-pack",
    toolSlug: "trade-journal",
    body: [
      "수익이 난 매매는 복기에서 빠지기 쉽습니다. 하지만 운 좋게 맞은 결과와 기준을 지킨 결과는 완전히 다릅니다.",
      "수익 매매를 복기하면 내가 반복해도 되는 행동과 우연히 넘어간 행동을 분리할 수 있습니다.",
      "특히 진입 근거가 흐렸는데 결과만 좋았던 매매는 다음 실험에서 위험한 습관으로 남을 수 있습니다.",
      "복기표에는 결과보다 기준 준수 여부를 먼저 적어보세요. 손절, 익절, 진입 이유가 계획과 맞았는지 확인합니다.",
      "좋은 복기는 수익 자랑이 아니라 다음 실험의 기준을 정리하는 과정입니다.",
      closing
    ]
  },
  {
    slug: "stop-loss-before-condition",
    title: "손절 기준 없이 조건식을 쓰면 생기는 일",
    excerpt: "조건식보다 먼저 정해야 할 것은 실패했을 때 실험을 멈추는 기준입니다.",
    category: "복기",
    persona: "all",
    tags: ["손절", "리스크", "기록"],
    readingMinutes: 5,
    freeResourceSlug: "mock-trade-template",
    toolSlug: "rr-calculator",
    body: [
      "조건식이 잘 작동하는지 보려면 실패 기준이 먼저 있어야 합니다. 기준 없는 진입은 결과를 해석하기 어렵게 만듭니다.",
      "손절 기준은 손실을 예측한다는 뜻이 아니라 실험을 중단할 조건을 정한다는 뜻입니다.",
      "예를 들어 전일 고점 돌파를 본다면 돌파선 이탈, 거래대금 감소, 특정 캔들 저점 이탈처럼 관찰 가능한 기준을 정할 수 있습니다.",
      "손익비 계산기는 이런 기준이 숫자로 말이 되는지 확인하는 데 도움을 줍니다.",
      "조건식과 손절 기준을 함께 기록해야 다음 실험에서 같은 실수를 줄일 수 있습니다.",
      closing
    ]
  },
  {
    slug: "one-stock-review",
    title: "하루 1종목만 복기해도 실력이 느는 이유",
    excerpt: "많이 보는 것보다 같은 형식으로 꾸준히 남기는 것이 조건식 실험의 밀도를 높입니다.",
    category: "모의투자",
    persona: "20s",
    tags: ["모의투자", "복기", "루틴"],
    readingMinutes: 4,
    freeResourceSlug: "mock-trade-template",
    productSlug: "mock-league-earlybird",
    toolSlug: "trade-journal",
    body: [
      "처음부터 많은 종목을 복기하려고 하면 오래 지속하기 어렵습니다. 하루 1종목만 같은 형식으로 남겨도 충분히 실험이 됩니다.",
      "중요한 것은 종목 수가 아니라 기록의 일관성입니다. 조건식, 진입 이유, 손절 기준, 결과, 감정을 같은 순서로 남겨야 합니다.",
      "모의투자는 실제 돈을 넣기 전 행동 패턴을 발견하는 안전한 연습장입니다.",
      "하루 1종목 기록이 쌓이면 어떤 조건에서 조급해지는지, 어떤 자리에서 기준이 흔들리는지 보입니다.",
      "리그도 단순 수익률보다 기록 성실도와 기준 준수를 함께 보는 방식이어야 합니다.",
      closing
    ]
  },
  {
    slug: "failure-cases-matter",
    title: "조건식 성공 사례보다 실패 사례가 중요한 이유",
    excerpt: "실패 사례는 조건식의 경계선을 알려줍니다. 경계가 있어야 실험이 반복됩니다.",
    category: "복기",
    persona: "all",
    tags: ["실패조건", "프리미엄", "복기"],
    readingMinutes: 4,
    freeResourceSlug: "volume-failure",
    productSlug: "premium-article-pack",
    body: [
      "성공 사례만 보면 조건식이 좋아 보입니다. 하지만 실제 실험에서는 실패 사례가 조건식의 경계선을 만들어 줍니다.",
      "어떤 장세에서 약한지, 어떤 거래대금 구간에서 흔들리는지, 어떤 캔들 뒤에 실패가 잦은지 기록해야 합니다.",
      "실패 사례는 실망할 일이 아니라 다음 필터를 만드는 재료입니다.",
      "프리미엄 사례도 성공담보다 실패 조건과 제외 기준을 중심으로 읽어야 도움이 됩니다.",
      "조건식 실험은 맞히는 게임이 아니라 기준을 선명하게 만드는 과정입니다.",
      closing
    ]
  },
  {
    slug: "ai-condition-prompt",
    title: "AI에게 조건식을 물어볼 때 이렇게 질문하라",
    excerpt: "AI에게 답을 맡기기보다 시장 조건, 제외 기준, 복기 형식을 함께 요청해야 합니다.",
    category: "AI",
    persona: "ai",
    tags: ["AI", "프롬프트", "자동화"],
    readingMinutes: 5,
    freeResourceSlug: "condition-note",
    toolSlug: "trade-journal",
    body: [
      "AI에게 조건식을 바로 만들어 달라고 묻는 것보다 먼저 실험 목적을 설명하는 편이 좋습니다.",
      "예를 들어 관찰할 시간대, 제외할 종목 유형, 손절 기준, 복기 항목을 함께 요청하면 결과가 더 실험 가능한 형태가 됩니다.",
      "AI가 준 조건식은 정답이 아니라 초안입니다. 실제 차트와 모의투자 기록으로 검증해야 합니다.",
      "좋은 프롬프트는 조건식 자체보다 실패 조건과 기록 양식을 같이 묻습니다.",
      "AI는 판단을 대신하는 도구가 아니라 내 기준을 정리하는 보조 도구로 쓰는 편이 안전합니다.",
      closing
    ]
  },
  {
    slug: "mock-before-real",
    title: "모의투자 기록 없이 실전 매매하면 위험한 이유",
    excerpt: "실전 전에 기록 습관을 만들지 않으면 결과가 좋아도 재현 가능한지 확인하기 어렵습니다.",
    category: "모의투자",
    persona: "all",
    tags: ["모의투자", "리스크", "기록"],
    readingMinutes: 4,
    freeResourceSlug: "mock-trade-template",
    productSlug: "mock-league-earlybird",
    toolSlug: "trade-journal",
    body: [
      "모의투자는 단순한 연습 게임이 아닙니다. 내 조건식과 행동 기준을 실제 돈을 쓰기 전에 점검하는 과정입니다.",
      "기록 없이 실전으로 넘어가면 어떤 조건에서 들어갔는지, 왜 버텼는지, 왜 놓쳤는지 기억에 의존하게 됩니다.",
      "기억은 결과에 따라 쉽게 바뀝니다. 그래서 같은 양식으로 남긴 기록이 필요합니다.",
      "모의투자 기록은 수익률보다 기준 준수와 복기 성실도를 봐야 합니다.",
      "실전 여부와 무관하게 먼저 기록 습관을 만드는 것이 조건식 실험의 출발점입니다.",
      closing
    ]
  }
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
