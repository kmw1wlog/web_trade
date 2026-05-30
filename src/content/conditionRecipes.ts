export type RecipeCategory =
  | "캔들 패턴"
  | "추세선/채널"
  | "이동평균/그랜빌"
  | "거래량/거래대금"
  | "국장 단타 전략"
  | "보조지표"
  | "패턴/파동"
  | "리스크/복기";

export type RecipePlatform = "TradingView" | "예스트레이더" | "HTS 체크리스트";

export type ConditionRecipe = {
  id: string;
  title: string;
  category: RecipeCategory;
  intents: string[];
  markets: string[];
  difficulty: "초급" | "중급" | "상급";
  summary: string;
  freePreview: string[];
  yesTraderHint: string;
  tradingViewHint: string;
  cookiesRequired: number;
  platforms: RecipePlatform[];
};

const recipeSeeds: Array<Omit<ConditionRecipe, "id" | "cookiesRequired" | "yesTraderHint" | "tradingViewHint" | "platforms">> = [
  { title: "장대양봉 거래량 확인", category: "캔들 패턴", intents: ["거래량 급증", "시초가"], markets: ["국장"], difficulty: "초급", summary: "장대양봉이 거래량 증가와 함께 나왔는지 먼저 확인하는 관찰 조건입니다.", freePreview: ["양봉 몸통 비율", "전일 대비 거래량", "고가 부근 종가"] },
  { title: "장대음봉 회피 체크", category: "캔들 패턴", intents: ["과열 회피", "리스크"], markets: ["국장", "미장"], difficulty: "초급", summary: "강한 음봉 이후 반등을 추격하지 않기 위한 제외 조건입니다.", freePreview: ["음봉 몸통 비율", "종가 위치", "다음 봉 회복 여부"] },
  { title: "망치형 반등 후보", category: "캔들 패턴", intents: ["눌림목", "관찰"], markets: ["국장", "미장"], difficulty: "초급", summary: "아래꼬리와 종가 회복을 조합해 반등 후보를 분류합니다.", freePreview: ["아래꼬리 길이", "종가 회복", "거래량 동반"] },
  { title: "역망치형 저점 관찰", category: "캔들 패턴", intents: ["반전", "관찰"], markets: ["국장"], difficulty: "초급", summary: "상단 매물 테스트 후 다음 봉 확인이 필요한 반전 관찰 조건입니다.", freePreview: ["윗꼬리", "저점 지지", "다음 봉 양봉"] },
  { title: "도지 이후 방향 확인", category: "캔들 패턴", intents: ["복기", "관찰"], markets: ["국장", "미장"], difficulty: "초급", summary: "방향성이 약한 도지 이후 거래량이 붙는 쪽을 확인합니다.", freePreview: ["시가/종가 근접", "다음 봉 방향", "거래량 변화"] },
  { title: "샛별형 상승 전환", category: "캔들 패턴", intents: ["눌림목", "반전"], markets: ["국장"], difficulty: "중급", summary: "하락 이후 도지 또는 짧은 몸통과 양봉 회복을 묶어 봅니다.", freePreview: ["하락 선행", "중간 캔들", "양봉 회복"] },
  { title: "장악형 상승 전환", category: "캔들 패턴", intents: ["반전", "거래량 급증"], markets: ["국장", "미장"], difficulty: "중급", summary: "이전 음봉을 감싸는 양봉이 거래량을 동반했는지 확인합니다.", freePreview: ["이전 음봉 범위", "양봉 장악", "거래량 증가"] },
  { title: "교수형 과열 경고", category: "캔들 패턴", intents: ["과열 회피", "복기"], markets: ["국장"], difficulty: "초급", summary: "상승 후 긴 아래꼬리와 약한 종가를 과열 경고로 분류합니다.", freePreview: ["상승 선행", "아래꼬리", "종가 위치"] },
  { title: "트위저 탑/바텀", category: "캔들 패턴", intents: ["반전", "복기"], markets: ["국장", "미장"], difficulty: "중급", summary: "비슷한 고점/저점이 반복될 때 반전 가능성을 기록합니다.", freePreview: ["고점 유사", "저점 유사", "두 번째 봉 위치"] },
  { title: "철도형 캔들", category: "캔들 패턴", intents: ["반전", "관찰"], markets: ["국장"], difficulty: "중급", summary: "서로 반대 방향의 긴 몸통 캔들이 붙어 나오는 전환 패턴입니다.", freePreview: ["연속 긴 몸통", "두 번째 봉 장악", "거래량 확인"] },
  { title: "상승 추세선 지지", category: "추세선/채널", intents: ["눌림목", "관찰"], markets: ["국장", "미장"], difficulty: "초급", summary: "상승 추세선 근처에서 가격이 지지되는지 확인합니다.", freePreview: ["저점 2개 이상", "추세선 근접", "종가 이탈 여부"] },
  { title: "하락 추세선 돌파", category: "추세선/채널", intents: ["전고점 돌파", "관찰"], markets: ["국장"], difficulty: "초급", summary: "하락 추세선을 종가 기준으로 돌파하는 후보를 찾습니다.", freePreview: ["고점 연결", "종가 돌파", "거래량 증가"] },
  { title: "박스권 상단 돌파", category: "추세선/채널", intents: ["돌파", "거래량 급증"], markets: ["국장"], difficulty: "초급", summary: "횡보 상단을 거래량과 함께 넘는지 확인합니다.", freePreview: ["상단 저항", "돌파 종가", "거래량 150%"] },
  { title: "박스권 하단 이탈 회피", category: "추세선/채널", intents: ["과열 회피", "리스크"], markets: ["국장"], difficulty: "초급", summary: "횡보 하단 이탈 종목을 제외하거나 복기 대상으로 둡니다.", freePreview: ["하단 지지", "종가 이탈", "회복 실패"] },
  { title: "상승 채널 하단 관찰", category: "추세선/채널", intents: ["눌림목", "관찰"], markets: ["국장", "미장"], difficulty: "중급", summary: "채널 하단 부근에서 반등 신호가 나오는지 봅니다.", freePreview: ["채널 하단", "거래량 감소", "양봉 전환"] },
  { title: "하락 채널 상단 돌파", category: "추세선/채널", intents: ["돌파", "반전"], markets: ["국장"], difficulty: "중급", summary: "하락 채널 상단 돌파와 거래량 변화를 함께 확인합니다.", freePreview: ["상단 저항", "돌파 종가", "다음 봉 유지"] },
  { title: "전고점 저항 재돌파", category: "추세선/채널", intents: ["전고점 돌파", "상따"], markets: ["국장"], difficulty: "중급", summary: "전고점 부근 매물을 소화하고 재돌파하는 관찰 조건입니다.", freePreview: ["전고점", "재돌파", "거래대금 증가"] },
  { title: "갭 상승 후 지지", category: "추세선/채널", intents: ["시초가", "눌림목"], markets: ["국장"], difficulty: "중급", summary: "갭 상승 이후 시가를 지키는지 확인합니다.", freePreview: ["갭 상승", "시가 지지", "분봉 회복"] },
  { title: "5일선 회복", category: "이동평균/그랜빌", intents: ["눌림목", "관찰"], markets: ["국장"], difficulty: "초급", summary: "단기 이동평균 회복으로 짧은 반등 후보를 정리합니다.", freePreview: ["5일선 아래", "종가 회복", "거래량 확인"] },
  { title: "20일선 눌림 반등", category: "이동평균/그랜빌", intents: ["눌림목", "종베"], markets: ["국장"], difficulty: "초급", summary: "20일선 근처에서 가격이 지지되는지 확인합니다.", freePreview: ["20일선 근접", "종가 지지", "음봉 축소"] },
  { title: "5/20 골든크로스", category: "이동평균/그랜빌", intents: ["관찰", "전고점 돌파"], markets: ["국장"], difficulty: "초급", summary: "단기선이 중기선을 위로 돌파하는 기본 관찰 조건입니다.", freePreview: ["5일선", "20일선", "돌파 당일 거래량"] },
  { title: "5/20 데드크로스 회피", category: "이동평균/그랜빌", intents: ["리스크", "복기"], markets: ["국장"], difficulty: "초급", summary: "단기선 이탈 후 약세 전환 가능성을 제외 조건으로 둡니다.", freePreview: ["5일선 이탈", "20일선 하향", "종가 약세"] },
  { title: "정배열 초기", category: "이동평균/그랜빌", intents: ["관찰", "종베"], markets: ["국장", "미장"], difficulty: "중급", summary: "단기·중기·장기선이 정배열로 정리되는 초입을 봅니다.", freePreview: ["5>20>60", "이격 과열 제외", "거래량 유지"] },
  { title: "역배열 제외", category: "이동평균/그랜빌", intents: ["과열 회피", "리스크"], markets: ["국장"], difficulty: "초급", summary: "역배열 상태에서는 돌파 신호를 보수적으로 분류합니다.", freePreview: ["5<20<60", "저항선", "거래량 부재"] },
  { title: "이평선 수렴 후 확산", category: "이동평균/그랜빌", intents: ["돌파", "거래량 급증"], markets: ["국장"], difficulty: "중급", summary: "수렴 구간 이후 거래량과 함께 방향이 나오는지 봅니다.", freePreview: ["이평선 수렴", "변동성 축소", "거래량 증가"] },
  { title: "그랜빌 매수 1번", category: "이동평균/그랜빌", intents: ["눌림목", "관찰"], markets: ["국장"], difficulty: "중급", summary: "이동평균 상향 전환과 가격 회복을 함께 확인합니다.", freePreview: ["이평선 방향", "가격 회복", "이격도"] },
  { title: "그랜빌 매수 2번", category: "이동평균/그랜빌", intents: ["눌림목", "종베"], markets: ["국장"], difficulty: "중급", summary: "상승 중 이동평균 근처 조정을 관찰합니다.", freePreview: ["상승 추세", "이평선 눌림", "반등 캔들"] },
  { title: "그랜빌 매도 회피", category: "이동평균/그랜빌", intents: ["리스크", "복기"], markets: ["국장"], difficulty: "중급", summary: "이동평균 하향 전환 이후 반등 추격을 피합니다.", freePreview: ["이평 하향", "가격 반등 실패", "거래량 약화"] },
  { title: "거래량 150% 증가", category: "거래량/거래대금", intents: ["거래량 급증", "관찰"], markets: ["국장"], difficulty: "초급", summary: "평균 거래량 대비 증가한 종목을 1차로 분류합니다.", freePreview: ["20일 평균", "당일 거래량", "종가 위치"] },
  { title: "거래대금 상위 급증", category: "거래량/거래대금", intents: ["상따", "시초가"], markets: ["국장"], difficulty: "초급", summary: "거래대금이 시장 관심을 동반하는지 확인합니다.", freePreview: ["거래대금 순위", "전일 대비", "테마 여부"] },
  { title: "거래량 동반 전고점 돌파", category: "거래량/거래대금", intents: ["전고점 돌파", "상따"], markets: ["국장"], difficulty: "중급", summary: "전고점 돌파와 거래량 증가가 동시에 나오는 조건입니다.", freePreview: ["전고점", "거래량 150%", "종가 돌파"] },
  { title: "거래량 없는 돌파 회피", category: "거래량/거래대금", intents: ["과열 회피", "복기"], markets: ["국장"], difficulty: "초급", summary: "돌파처럼 보이지만 거래량이 부족한 경우를 제외합니다.", freePreview: ["저항 돌파", "거래량 부족", "윗꼬리"] },
  { title: "회전율 급증", category: "거래량/거래대금", intents: ["관찰", "테마"], markets: ["국장"], difficulty: "중급", summary: "시가총액 대비 거래가 과도하게 도는 종목을 분류합니다.", freePreview: ["상장주식수", "거래량", "회전율"] },
  { title: "거래량 감소 눌림", category: "거래량/거래대금", intents: ["눌림목", "종베"], markets: ["국장"], difficulty: "중급", summary: "상승 후 조정 구간에서 거래량이 줄어드는지 봅니다.", freePreview: ["상승 선행", "조정 거래량 감소", "지지선"] },
  { title: "분봉 거래량 재유입", category: "거래량/거래대금", intents: ["시초가", "상따"], markets: ["국장"], difficulty: "중급", summary: "장중 쉬었다가 거래량이 다시 들어오는 구간을 봅니다.", freePreview: ["분봉 고점", "거래량 재증가", "고점 돌파"] },
  { title: "프로그램 순매수 동반", category: "거래량/거래대금", intents: ["관찰", "테마"], markets: ["국장"], difficulty: "중급", summary: "거래대금 증가와 프로그램 흐름을 함께 기록합니다.", freePreview: ["거래대금", "프로그램 흐름", "종가 위치"] },
  { title: "기관/외국인 수급 동반", category: "거래량/거래대금", intents: ["관찰", "종베"], markets: ["국장"], difficulty: "중급", summary: "수급과 가격 회복이 같은 방향인지 확인합니다.", freePreview: ["외국인", "기관", "종가 회복"] },
  { title: "거래량 클라이맥스 복기", category: "거래량/거래대금", intents: ["복기", "과열 회피"], markets: ["국장"], difficulty: "상급", summary: "과도한 거래량 이후 추격 실패를 복기 대상으로 둡니다.", freePreview: ["역대급 거래량", "윗꼬리", "다음 날 약세"] },
  { title: "저유동성 제외", category: "거래량/거래대금", intents: ["리스크", "과열 회피"], markets: ["국장"], difficulty: "초급", summary: "체결이 얇은 종목을 조건식 결과에서 제외합니다.", freePreview: ["평균 거래대금", "호가 공백", "체결 강도"] },
  { title: "상따 후보 1차", category: "국장 단타 전략", intents: ["상따", "거래량 급증"], markets: ["국장"], difficulty: "중급", summary: "상한가 근처 접근 종목을 거래대금과 함께 관찰합니다.", freePreview: ["등락률", "거래대금", "상한가 거리"] },
  { title: "상따 실패 제외", category: "국장 단타 전략", intents: ["상따", "리스크"], markets: ["국장"], difficulty: "중급", summary: "상한가 접근 후 밀리는 패턴을 제외합니다.", freePreview: ["상단 윗꼬리", "거래량 과열", "종가 약세"] },
  { title: "종베 후보", category: "국장 단타 전략", intents: ["종베", "관찰"], markets: ["국장"], difficulty: "중급", summary: "장 마감 전 종가 위치와 거래량을 기준으로 후보를 정리합니다.", freePreview: ["종가 고가권", "거래량 유지", "뉴스/테마"] },
  { title: "종베 회피", category: "국장 단타 전략", intents: ["종베", "리스크"], markets: ["국장"], difficulty: "초급", summary: "종가가 밀리거나 거래량이 꺼진 종목을 제외합니다.", freePreview: ["종가 저가권", "거래량 감소", "윗꼬리"] },
  { title: "시초가 돌파", category: "국장 단타 전략", intents: ["시초가", "돌파"], markets: ["국장"], difficulty: "중급", summary: "시초가 형성 후 고점 돌파와 거래량 재유입을 봅니다.", freePreview: ["시초가", "초반 고점", "분봉 거래량"] },
  { title: "시초가 갭 과열 회피", category: "국장 단타 전략", intents: ["시초가", "과열 회피"], markets: ["국장"], difficulty: "초급", summary: "큰 갭 이후 바로 밀리는 종목을 제외합니다.", freePreview: ["갭 크기", "시가 이탈", "거래량 과열"] },
  { title: "짝꿍매매 대장주 확인", category: "국장 단타 전략", intents: ["짝꿍매매", "테마"], markets: ["국장"], difficulty: "중급", summary: "같은 테마의 대장주 흐름을 먼저 확인합니다.", freePreview: ["테마 대장", "등락률 차이", "거래대금 차이"] },
  { title: "짝꿍매매 후발주", category: "국장 단타 전략", intents: ["짝꿍매매", "관찰"], markets: ["국장"], difficulty: "중급", summary: "대장주 강세 후 후발주의 거래량 유입을 봅니다.", freePreview: ["대장주 상승", "후발주 거래량", "저항 위치"] },
  { title: "테마 순환 관찰", category: "국장 단타 전략", intents: ["테마", "관찰"], markets: ["국장"], difficulty: "중급", summary: "같은 테마 안에서 순환매가 생기는지 기록합니다.", freePreview: ["테마 구성", "대장 교체", "거래대금 이동"] },
  { title: "뉴스 재료 반응", category: "국장 단타 전략", intents: ["테마", "시초가"], markets: ["국장"], difficulty: "중급", summary: "뉴스 이후 실제 거래대금이 붙는지 확인합니다.", freePreview: ["뉴스 시간", "거래대금", "시가 유지"] },
  { title: "낙폭과대 반등", category: "국장 단타 전략", intents: ["눌림목", "반전"], markets: ["국장"], difficulty: "중급", summary: "급락 후 거래량 축소와 양봉 전환을 함께 봅니다.", freePreview: ["낙폭", "거래량 축소", "양봉 전환"] },
  { title: "VI 이후 재돌파", category: "국장 단타 전략", intents: ["상따", "거래량 급증"], markets: ["국장"], difficulty: "상급", summary: "변동성 완화 이후 다시 고점을 회복하는지 관찰합니다.", freePreview: ["VI 기준", "재개 후 저점", "고점 회복"] },
  { title: "MACD 골든크로스", category: "보조지표", intents: ["관찰", "반전"], markets: ["국장", "미장"], difficulty: "초급", summary: "MACD선이 시그널선을 상향 돌파하는 기본 조건입니다.", freePreview: ["MACD", "Signal", "0선 위치"] },
  { title: "MACD 0선 회복", category: "보조지표", intents: ["추세", "관찰"], markets: ["국장", "미장"], difficulty: "중급", summary: "약세 구간에서 0선 위로 회복하는지 확인합니다.", freePreview: ["MACD 0선", "히스토그램", "가격 추세"] },
  { title: "RSI 과매도 회복", category: "보조지표", intents: ["반전", "눌림목"], markets: ["국장", "미장"], difficulty: "초급", summary: "RSI 과매도 구간에서 회복하는지 봅니다.", freePreview: ["RSI 30", "회복", "가격 지지"] },
  { title: "RSI 과열 회피", category: "보조지표", intents: ["과열 회피", "리스크"], markets: ["국장", "미장"], difficulty: "초급", summary: "RSI 과열 구간에서 추격을 보수적으로 분류합니다.", freePreview: ["RSI 70", "윗꼬리", "거래량 과열"] },
  { title: "볼린저밴드 상단 돌파", category: "보조지표", intents: ["돌파", "거래량 급증"], markets: ["국장"], difficulty: "중급", summary: "밴드 상단 돌파가 추세 확장인지 과열인지 구분합니다.", freePreview: ["상단 밴드", "거래량", "종가 유지"] },
  { title: "볼린저밴드 하단 반등", category: "보조지표", intents: ["반전", "눌림목"], markets: ["국장"], difficulty: "중급", summary: "하단 밴드 접촉 후 종가 회복을 확인합니다.", freePreview: ["하단 밴드", "아래꼬리", "중심선 거리"] },
  { title: "스토캐스틱 골든크로스", category: "보조지표", intents: ["반전", "관찰"], markets: ["국장"], difficulty: "초급", summary: "단기 과매도 후 스토캐스틱 회복을 봅니다.", freePreview: ["K선", "D선", "과매도 구간"] },
  { title: "VWAP 위 회복", category: "보조지표", intents: ["시초가", "관찰"], markets: ["미장", "국장"], difficulty: "중급", summary: "평균 체결 가격 위로 회복하는지 확인합니다.", freePreview: ["VWAP", "종가 회복", "거래량"] },
  { title: "ATR 변동성 확대", category: "보조지표", intents: ["리스크", "돌파"], markets: ["국장", "미장"], difficulty: "중급", summary: "변동성이 커지는 구간에서 손절 폭을 기록합니다.", freePreview: ["ATR", "당일 변동폭", "손절 기준"] },
  { title: "OBV 상승 확인", category: "보조지표", intents: ["거래량 급증", "관찰"], markets: ["국장", "미장"], difficulty: "중급", summary: "가격보다 거래량 누적 흐름이 먼저 개선되는지 봅니다.", freePreview: ["OBV 방향", "가격 방향", "다이버전스"] },
  { title: "일목균형표 구름대 회복", category: "보조지표", intents: ["추세", "관찰"], markets: ["국장", "미장"], difficulty: "중급", summary: "구름대 위로 회복하는지 확인해 추세 전환 후보를 분류합니다.", freePreview: ["구름대 상단", "종가 회복", "후행스팬"] },
  { title: "CVD 매수 우위", category: "보조지표", intents: ["거래량 급증", "관찰"], markets: ["코인", "미장"], difficulty: "상급", summary: "누적 델타가 가격 흐름과 같은 방향인지 관찰합니다.", freePreview: ["CVD 방향", "가격 방향", "거래량"] },
  { title: "CVD 다이버전스", category: "보조지표", intents: ["복기", "리스크"], markets: ["코인", "미장"], difficulty: "상급", summary: "가격과 CVD가 엇갈릴 때 추격을 보수적으로 봅니다.", freePreview: ["가격 고점", "CVD 고점", "거래량 변화"] },
  { title: "ABCD 패턴", category: "패턴/파동", intents: ["패턴", "관찰"], markets: ["국장", "미장"], difficulty: "중급", summary: "상승/하락 파동의 비율을 기준으로 후보를 분류합니다.", freePreview: ["AB 구간", "BC 조정", "CD 확장"] },
  { title: "하모닉 가틀리", category: "패턴/파동", intents: ["패턴", "반전"], markets: ["미장", "코인"], difficulty: "상급", summary: "피보나치 비율 기반 반전 후보를 기록합니다.", freePreview: ["XA", "AB", "CD 비율"] },
  { title: "하모닉 배트", category: "패턴/파동", intents: ["패턴", "관찰"], markets: ["미장", "코인"], difficulty: "상급", summary: "깊은 되돌림 이후 반전 구간을 가정해 봅니다.", freePreview: ["되돌림", "PRZ", "손절 기준"] },
  { title: "피보나치 0.382 눌림", category: "패턴/파동", intents: ["눌림목", "관찰"], markets: ["국장", "미장"], difficulty: "중급", summary: "짧은 되돌림 후 추세 지속 여부를 기록합니다.", freePreview: ["상승 파동", "0.382", "양봉 회복"] },
  { title: "피보나치 0.618 눌림", category: "패턴/파동", intents: ["눌림목", "반전"], markets: ["국장", "미장"], difficulty: "중급", summary: "깊은 조정 이후 반전 여부를 보수적으로 확인합니다.", freePreview: ["0.618", "지지", "거래량 감소"] },
  { title: "엘리어트 3파 후보", category: "패턴/파동", intents: ["추세", "관찰"], markets: ["미장", "코인"], difficulty: "상급", summary: "강한 추세 구간으로 해석되는 3파 후보를 기록합니다.", freePreview: ["1파", "2파 조정", "고점 돌파"] },
  { title: "엘리어트 5파 과열", category: "패턴/파동", intents: ["과열 회피", "복기"], markets: ["미장", "코인"], difficulty: "상급", summary: "마지막 상승 구간으로 보일 때 추격을 제한합니다.", freePreview: ["5파 추정", "다이버전스", "거래량 둔화"] },
  { title: "삼각수렴 이탈", category: "패턴/파동", intents: ["돌파", "리스크"], markets: ["국장", "미장"], difficulty: "중급", summary: "수렴 후 방향 이탈을 확인하되 속임수 가능성을 기록합니다.", freePreview: ["고점 하락", "저점 상승", "이탈 방향"] },
  { title: "손절 기준 선작성", category: "리스크/복기", intents: ["리스크", "복기"], markets: ["국장", "미장"], difficulty: "초급", summary: "조건식을 보기 전 손절 기준을 먼저 적는 체크리스트입니다.", freePreview: ["기준선", "손실률", "재진입 금지"] },
  { title: "익절 기준 분할", category: "리스크/복기", intents: ["복기", "리스크"], markets: ["국장"], difficulty: "초급", summary: "목표가가 아니라 대응 기준을 나누어 기록합니다.", freePreview: ["1차 기준", "2차 기준", "잔량 관리"] },
  { title: "실패 조건 분리", category: "리스크/복기", intents: ["복기", "과열 회피"], markets: ["국장"], difficulty: "초급", summary: "성공 조건보다 먼저 실패 조건을 별도로 기록합니다.", freePreview: ["거래량 실패", "고점 실패", "종가 실패"] },
  { title: "MDD 체크", category: "리스크/복기", intents: ["리스크", "모의투자"], markets: ["국장", "미장"], difficulty: "중급", summary: "모의투자에서 최대 낙폭을 기준으로 전략을 비교합니다.", freePreview: ["최대 낙폭", "연속 손실", "회복 기간"] },
  { title: "감정 태그 복기", category: "리스크/복기", intents: ["복기", "모의투자"], markets: ["국장"], difficulty: "초급", summary: "추격, 공포, 확신 같은 감정 태그를 함께 남깁니다.", freePreview: ["진입 감정", "청산 감정", "다음 행동"] },
  { title: "추격매수 경고", category: "리스크/복기", intents: ["과열 회피", "리스크"], markets: ["국장"], difficulty: "초급", summary: "급등 후 늦은 진입을 경고하는 제외 조건입니다.", freePreview: ["급등률", "이격도", "윗꼬리"] },
  { title: "거래량 실패 복기", category: "리스크/복기", intents: ["복기", "거래량 급증"], markets: ["국장"], difficulty: "초급", summary: "거래량이 붙었지만 가격이 유지되지 못한 사례를 기록합니다.", freePreview: ["거래량", "종가 위치", "다음 날 흐름"] },
  { title: "조건식 과최적화 체크", category: "리스크/복기", intents: ["복기", "리스크"], markets: ["국장", "미장"], difficulty: "상급", summary: "조건이 너무 많아 실제 사용성이 떨어지는지 점검합니다.", freePreview: ["조건 수", "검색 빈도", "실패 사례"] }
];

export const conditionRecipes: ConditionRecipe[] = recipeSeeds.map((recipe, index) => ({
  ...recipe,
  id: `${recipe.category.replaceAll("/", "-").replaceAll(" ", "-")}-${String(index + 1).padStart(3, "0")}`,
  cookiesRequired: 2,
  platforms: ["TradingView", "예스트레이더", "HTS 체크리스트"],
  yesTraderHint: "예스트레이더용 조건식 변환은 쿠키 2개 사용 후 표시됩니다.",
  tradingViewHint: "TradingView Pine Script 초안은 쿠키 2개 사용 후 표시됩니다."
}));

export const recipeCategories = Array.from(new Set(conditionRecipes.map((recipe) => recipe.category)));
export const recipeIntents = Array.from(new Set(conditionRecipes.flatMap((recipe) => recipe.intents)));

export function findRecipes(input: { intent?: string; category?: string; query?: string; limit?: number }) {
  const query = input.query?.trim().toLowerCase();
  const results = conditionRecipes.filter((recipe) => {
    const matchesIntent = !input.intent || recipe.intents.includes(input.intent);
    const matchesCategory = !input.category || recipe.category === input.category;
    const matchesQuery =
      !query ||
      recipe.title.toLowerCase().includes(query) ||
      recipe.summary.toLowerCase().includes(query) ||
      recipe.freePreview.some((item) => item.toLowerCase().includes(query));

    return matchesIntent && matchesCategory && matchesQuery;
  });

  return typeof input.limit === "number" ? results.slice(0, input.limit) : results;
}

export function getRecipeById(id: string) {
  return conditionRecipes.find((recipe) => recipe.id === id);
}
