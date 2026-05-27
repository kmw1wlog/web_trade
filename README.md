# 투자도구 허브

“무료 혜택부터 담아두고, 지표와 모의투자로 직접 확인하세요.”

SNS에서 유입된 사용자가 3일 무료 쿠폰, 무료 지표·전자책, 프리미엄 체험, 웹 기능, 앱 베타, 사전예약을 먼저 담아두고 다시 방문할 수 있게 만든 투자도구 허브 MVP입니다. 홈페이지는 긴 설명형 랜딩보다 카드형 무료 혜택 보관함과 스크롤형 이용가이드를 우선합니다.

투자 추천, 종목 리딩, 수익 보장, 실시간 매수/매도 지시는 제공하지 않습니다.

## 실행 방법

```bash
npx -y pnpm@9.15.9 install
npx -y pnpm@9.15.9 dev
```

검증:

```bash
npx -y pnpm@9.15.9 lint
npx -y pnpm@9.15.9 build
npx -y pnpm@9.15.9 test
```

## 환경변수

`.env.example`을 참고해 `.env.local`을 만듭니다. Supabase, Creem, GA4, PostHog, Manychat, Admin 환경변수가 없어도 로컬 UI와 API fallback은 동작합니다.

중요: `SUPABASE_SERVICE_ROLE_KEY`, `CREEM_API_KEY`, `CREEM_WEBHOOK_SECRET`, `MANYCHAT_WEBHOOK_SECRET`, `ADMIN_PASSWORD`는 서버에서만 사용합니다.

## Supabase schema 적용

Supabase SQL editor 또는 migration 도구에서 `supabase/schema.sql`을 실행합니다. RLS는 활성화하지만 공개 insert 정책은 만들지 않습니다. 서버 API route가 service role key로 insert합니다.

## Creem 설정

Creem dashboard에서 상품을 만든 뒤 각 product id를 `.env.local`에 넣습니다.

```bash
CREEM_PRODUCT_PREMIUM_ARTICLE_PACK=
CREEM_PRODUCT_EBOOK_BETA=
CREEM_PRODUCT_PREMIUM_PASS=
CREEM_PRODUCT_MOCK_LEAGUE_EARLYBIRD=
```

Checkout route는 `/api/checkout`, webhook URL은 `/api/webhooks/creem`입니다. `CREEM_WEBHOOK_SECRET`으로 `creem-signature` HMAC-SHA256을 검증합니다. 환경변수가 없으면 checkout은 대기 신청 fallback을 반환합니다.

## Manychat webhook

Manychat 또는 Make에서 POST 요청을 `/api/manychat`으로 보냅니다. `MANYCHAT_WEBHOOK_SECRET`이 설정되어 있으면 header `x-webhook-secret` 또는 query `secret`이 일치해야 합니다.

예시 body:

```json
{
  "keyword": "조건",
  "channel": "instagram_20s",
  "instagramUsername": "example_user",
  "firstName": "민수",
  "source": "manychat"
}
```

응답의 `resource.url`을 DM 메시지에 사용합니다.

## 배포

Vercel에 연결한 뒤 환경변수를 등록합니다. Supabase service role key와 Creem API key는 client로 노출하지 않습니다.

## 금지된 투자 표현

다음 표현은 콘텐츠와 metadata에 사용하지 않습니다: 지금 매수, 지금 매도, 따라 하면 수익, 월 n% 가능, 손실 보전, 수익 보장, 원금 보장, VIP 리딩, 운용, 펀드, 일임, 세력 매집 확정, 목표가 보장.

## MVP 이후 TODO

- 실제 PDF 생성/업로드
- 회원가입/로그인 기반 구매 내역 조회
- 프리미엄 글 hard gating
- 앱 베타 초대 기능
- API 키 발급 기능
- 모의투자 리그 랭킹
- 이메일 발송 연동
- 관리자 CSV export
- 코인 실험실 별도 도메인 분리
- 법률 검토 후 제휴/레퍼럴 정책 확정
