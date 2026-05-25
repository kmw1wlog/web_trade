# AGENTS.md

## Product

이 저장소는 “조건식실험실” 종합웹이다.

목표는 인스타그램에서 유입된 사용자를 다음 흐름으로 전환시키는 것이다.

Instagram post
→ keyword DM / free resource
→ website article
→ free tool
→ paid product or waitlist
→ lead database / order / partner inquiry

## Safety and Compliance

이 서비스는 투자 추천, 종목 리딩, 수익 보장, 손실 보전, 자산 운용, 일임, 자동매매, 카피트레이딩을 제공하지 않는다.

금지 문구:
- 지금 매수
- 지금 매도
- 따라 하면 수익
- 월 n% 가능
- 손실 보전
- 수익 보장
- 원금 보장
- VIP 리딩
- 운용
- 펀드
- 일임
- 세력 매집 확정
- 목표가 보장

대체 문구:
- 관찰 조건
- 모의투자 예시
- 복기 사례
- 실패 조건
- 리스크 기준
- 기록용 체크리스트
- 전략 실험
- 조건식 학습
- 시장 해석 예시

## Code Style

- TypeScript strict
- App Router
- 서버 컴포넌트 우선
- Form 입력은 zod로 검증
- 환경변수 누락 시 graceful fallback
- 모든 외부 비밀키는 서버에서만 사용
- `NEXT_PUBLIC_` 키에는 공개 가능한 값만 둔다

## UX

- 한국어 중심
- 모바일 우선
- CTA는 명확하게
- 모든 게시글 하단에 무료 자료, 관련 도구, 유료상품, 사전예약 CTA를 배치한다.
- 주요 페이지에는 투자 유의사항 컴포넌트를 노출한다.

## Definition of Done

- 주요 라우트가 모두 구현되어야 한다.
- seed content가 있어야 한다.
- Supabase SQL schema 또는 migration 파일이 있어야 한다.
- Creem checkout route와 webhook route가 있어야 한다.
- Manychat webhook 수신 route가 있어야 한다.
- UTM 저장과 이벤트 트래킹 유틸이 있어야 한다.
- README에 실행 방법과 env 예시가 있어야 한다.
- lint/build가 통과해야 한다.
