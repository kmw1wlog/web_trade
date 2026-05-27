import { BarChart3, Bell, BookOpen, MessageCircle, NotebookPen, Palette, Send, Users } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { BenefitCard, type BenefitCardItem } from "@/components/home/BenefitCard";
import { CouponClaimPanel } from "@/components/home/CouponClaimPanel";
import { FreeKitPanel } from "@/components/home/FreeKitPanel";
import { TrackedLink } from "@/components/home/TrackedLink";
import { ProductCard } from "@/components/cards/ProductCard";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { DisclosureBanner } from "@/components/site/DisclosureBanner";
import { SectionHeading } from "@/components/site/SectionHeading";
import { blogPosts } from "@/content/blog";
import { products } from "@/content/products";

const benefitCards: BenefitCardItem[] = [
  {
    id: "coupon",
    label: "무료",
    title: "3일 무료 쿠폰",
    description: "지표·기능 10회 체험권을 먼저 받아두세요.",
    href: "#coupon",
    cta: "쿠폰 받기",
    eventName: "coupon_claim_click"
  },
  {
    id: "free-kit",
    label: "자료",
    title: "무료 지표·전자책",
    description: "CVD, 거래량, 조건식 입문 자료를 무료로 받습니다.",
    href: "#free-kit",
    cta: "자료 받기",
    eventName: "free_kit_click"
  },
  {
    id: "premium-trial",
    label: "체험",
    title: "프리미엄 1개월 혜택",
    description: "심화 글과 프리미엄 노트 체험 혜택을 대기 신청합니다.",
    href: "#premium-trial",
    cta: "혜택 보기",
    eventName: "premium_trial_click"
  },
  {
    id: "web-tools",
    label: "웹",
    title: "웹 기능 체험",
    description: "지표, 알림, 조건식, 모의투자 기능을 먼저 눌러봅니다.",
    href: "#tools-preview",
    cta: "기능 보기",
    eventName: "web_tool_try_click"
  },
  {
    id: "app-beta",
    label: "앱",
    title: "앱 무료 베타",
    description: "웹에서 검증한 기능을 앱으로 옮기는 베타에 신청합니다.",
    href: "#app-beta",
    cta: "베타 신청",
    eventName: "app_beta_click"
  },
  {
    id: "preorder",
    label: "예약",
    title: "강의·도구 사전예약",
    description: "전자책, 강의, 기능권을 정식 출시 전 혜택으로 확인합니다.",
    href: "#preorder",
    cta: "사전예약",
    eventName: "preorder_click"
  }
];

const toolPreviews = [
  {
    title: "CVD 예시 차트",
    description: "거래대금 흐름을 구간별로 살펴보는 정적 데모입니다.",
    href: "/tools",
    icon: BarChart3,
    caption: "데모 예시"
  },
  {
    title: "거래량 급증 카드",
    description: "거래량이 늘어난 뒤 실패 조건을 따로 체크합니다.",
    href: "/blog/volume-breakout-fail",
    icon: Bell,
    caption: "데모 예시"
  },
  {
    title: "자연어 조건식 입력",
    description: "아이디어를 조건식 체크리스트 형태로 정리하는 흐름입니다.",
    href: "/waitlist?type=api",
    icon: NotebookPen,
    caption: "준비 중"
  },
  {
    title: "모의투자 기록장",
    description: "진입 근거, 손절 기준, 결과, 복기를 같은 양식으로 남깁니다.",
    href: "/tools#trade-journal",
    icon: BookOpen,
    caption: "체험 가능"
  },
  {
    title: "관심종목 알림/색상 분류",
    description: "빨강, 파랑, 회색으로 관찰 목적을 빠르게 나눕니다.",
    href: "/tools#color-classifier",
    icon: Palette,
    caption: "체험 가능"
  }
];

const quickLinks = [
  ["무료 쿠폰 받기", "#coupon"],
  ["무료 자료 받기", "#free-kit"],
  ["웹 기능 체험", "#tools-preview"],
  ["앱 베타 신청", "#app-beta"],
  ["사전예약 보기", "#preorder"],
  ["웹블로그 보기", "/blog"],
  ["제휴 문의", "/partners"]
];

const communityLinks = [
  {
    title: "텔레그램",
    description: "빠른 공지, 쿠폰 만료, 새 기능 안내",
    href: "/waitlist?source=community&channel=telegram",
    icon: Send
  },
  {
    title: "네이버 카페",
    description: "자료실, 긴 글, 질문, 후기",
    href: "/waitlist?source=community&channel=cafe",
    icon: Users
  },
  {
    title: "이메일 알림",
    description: "무료자료, 앱 베타, 사전예약 안내",
    href: "/waitlist?source=community&channel=email",
    icon: MessageCircle
  }
];

export default function HomePage() {
  return (
    <div className="bg-cream">
      <section className="border-b border-line bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
          <div className="mb-6 max-w-3xl">
            <p className="text-sm font-black text-gold">SNS에서 오셨다면</p>
            <h1 className="mt-3 font-display text-4xl font-black leading-tight text-navy md:text-5xl">무료 혜택부터 담아두세요</h1>
            <p className="mt-3 text-base leading-7 text-muted md:text-lg">지표, 전자책, 앱 베타, 사전예약을 한 번에 확인하는 투자도구 허브입니다.</p>
            <p className="mt-2 text-sm font-semibold text-muted">종목 추천이나 수익 보장이 아니라, 직접 판단할 수 있는 자료와 도구를 제공합니다.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <TrackedLink href="#coupon" eventName="coupon_claim_click" className="rounded-lg bg-navy px-5 py-3 text-sm font-black text-white transition hover:bg-green">
                무료 쿠폰 받기
              </TrackedLink>
              <TrackedLink href="#tools-preview" eventName="web_tool_try_click" className="rounded-lg border border-navy bg-white px-5 py-3 text-sm font-black text-navy transition hover:bg-white">
                기능 체험하기
              </TrackedLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {benefitCards.map((card, index) => (
              <BenefitCard key={card.id} card={card} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section id="coupon" className="scroll-mt-24 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <CouponClaimPanel />
        </div>
      </section>

      <section id="guide" className="scroll-mt-24 bg-white py-14">
        <article className="mx-auto max-w-4xl px-4">
          <p className="text-sm font-black text-gold">이용가이드</p>
          <h2 className="mt-3 font-display text-4xl font-black leading-tight text-navy">처음 오셨다면 이 순서대로 보세요</h2>
          <p className="mt-4 text-lg leading-8 text-muted">
            SNS에서 본 투자 아이디어를 바로 따라 하기보다, 무료 자료와 웹 기능으로 먼저 확인하는 흐름입니다.
          </p>

          <div className="mt-8 rounded-lg border border-line bg-cream p-5">
            <p className="text-sm font-black text-charcoal">빠른 링크 모음</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {quickLinks.map(([label, href]) => (
                <TrackedLink key={label} href={href} eventName="guide_anchor_click" properties={{ label, href }} className="rounded-lg border border-line bg-white px-3 py-2 text-sm font-bold text-navy hover:border-gold">
                  {label}
                </TrackedLink>
              ))}
            </div>
          </div>

          <GuideBlock title="1. 이 웹은 무엇을 위한 곳인가">
            이 웹은 종목 추천방이 아닙니다. SNS에서 본 조건식, 지표, 차트 아이디어를 사용자가 직접 이해하고, 기록하고, 모의투자로 검증해볼 수 있게 돕는 투자도구 허브입니다.
          </GuideBlock>

          <GuideBlock title="2. 처음 온 사람 추천 순서">
            <ol className="grid gap-2">
              {["3일 무료 쿠폰을 받아둔다.", "무료 지표·전자책을 저장한다.", "웹 기능을 1번 눌러본다.", "관심 있으면 앱 베타를 신청한다.", "더 깊게 배우고 싶으면 강의·도구 사전예약을 확인한다."].map((item, index) => (
                <li key={item} className="rounded-lg border border-line bg-white px-4 py-3">
                  {index + 1}. {item}
                </li>
              ))}
            </ol>
          </GuideBlock>

          <GuideBlock title="3. 무료 쿠폰은 어디에 쓰나">
            <ul className="grid gap-2">
              {["CVD 예시 차트 보기", "거래량 급증 예시 확인", "자연어 조건식 입력해보기", "모의투자 기록 양식 확인", "앱 베타/사전예약 혜택 확인"].map((item) => (
                <li key={item} className="rounded-lg bg-cream px-4 py-3">{item}</li>
              ))}
            </ul>
          </GuideBlock>

          <GuideBlock title="4. 무료 자료와 기능을 언제 쓰면 좋은지">
            무료 자료는 처음 구조를 잡을 때, 웹 기능은 내가 본 아이디어를 직접 기록해볼 때, 앱 베타와 사전예약은 계속 다시 확인할 장치를 만들고 싶을 때 쓰면 좋습니다.
          </GuideBlock>
        </article>
      </section>

      <section id="tools-preview" className="scroll-mt-24 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="이런 기능을 먼저 눌러볼 수 있습니다" description="실시간 데이터처럼 과장하지 않고, 현재 버전에서 확인 가능한 데모와 예시 중심으로 제공합니다." />
          <div className="grid gap-4 md:grid-cols-5">
            {toolPreviews.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.title} className="rounded-lg border border-line bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-md bg-gold/10 px-2 py-1 text-xs font-black text-gold">{tool.caption}</span>
                    <Icon className="text-green" size={22} />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-black leading-tight text-navy">{tool.title}</h3>
                  <p className="mt-2 min-h-[72px] text-sm leading-6 text-muted">{tool.description}</p>
                  <TrackedLink href={tool.href} eventName="web_tool_try_click" properties={{ title: tool.title }} className="mt-4 rounded-lg bg-navy px-4 py-3 text-sm font-bold text-white">
                    데모 보기
                  </TrackedLink>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="free-kit" className="scroll-mt-24 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="무료로 먼저 받아가세요" description="준비된 자료부터 이메일로 안내됩니다. 파일 다운로드는 정식 자료가 준비되는 순서대로 연결합니다." />
          <FreeKitPanel />
        </div>
      </section>

      <section id="premium-trial" className="scroll-mt-24 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm font-black text-gold">프리미엄 체험</p>
            <h2 className="mt-3 font-display text-4xl font-black leading-tight text-navy">프리미엄 콘텐츠는 1개월 체험 혜택으로 시작합니다</h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              인스타에 다 담지 못한 조건식 사례, 지표 해석, 복기 노트를 프리미엄 콘텐츠로 정리합니다. 네이버프리미엄/자체 프리미엄 콘텐츠 체험 혜택은 대기 신청자에게 먼저 안내됩니다.
            </p>
          </div>
          <WaitlistForm
            type="premium"
            source="home_premium_trial"
            submitLabel="프리미엄 체험 대기"
            options={["프리미엄 노트", "네이버프리미엄 체험", "조건식 사례", "지표 해석", "복기 노트"]}
          />
        </div>
      </section>

      <section id="app-beta" className="scroll-mt-24 bg-white py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm font-black text-gold">앱 무료 베타</p>
            <h2 className="mt-3 font-display text-4xl font-black leading-tight text-navy">웹에서 자주 쓰는 기능은 앱으로 옮깁니다</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {["앱 출시 알림", "무료 베타 이용권", "기능 투표권", "얼리버드 할인권", "모의투자 대회 우선 안내"].map((item) => (
                <p key={item} className="rounded-lg border border-line bg-cream px-4 py-3 text-sm font-bold text-charcoal">{item}</p>
              ))}
            </div>
          </div>
          <WaitlistForm
            type="app"
            source="home_app_beta"
            submitLabel="앱 베타 신청"
            options={["앱 베타", "지표 알림", "조건식 저장", "모의투자 기록", "프리미엄 글 알림"]}
          />
        </div>
      </section>

      <section id="preorder" className="scroll-mt-24 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm font-black text-gold">사전예약</p>
            <h2 className="mt-3 font-display text-4xl font-black leading-tight text-navy">정식 출시 전 먼저 신청하세요</h2>
            <p className="mt-4 text-lg leading-8 text-muted">얼리버드 가격과 베타 혜택은 신청자에게 먼저 안내됩니다.</p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {["조건식·모의투자 강의", "CVD/거래량 전자책", "웹 지표 프리미엄", "앱 구독권", "모의투자 리그"].map((item) => (
                <p key={item} className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-bold text-charcoal">{item}</p>
              ))}
            </div>
          </div>
          <WaitlistForm
            type="course"
            source="home_preorder"
            submitLabel="사전예약 혜택 받기"
            options={["조건식·모의투자 강의", "CVD/거래량 전자책", "웹 지표 프리미엄", "앱 구독권", "모의투자 리그"]}
          />
        </div>
      </section>

      <section id="community" className="scroll-mt-24 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="업데이트와 무료자료를 계속 받고 싶다면" />
          <div className="grid gap-4 md:grid-cols-3">
            {communityLinks.map((item) => {
              const Icon = item.icon;
              return (
                <TrackedLink key={item.title} href={item.href} eventName="community_click" properties={{ channel: item.title }} className="block rounded-lg border border-line bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream text-green">
                      <Icon size={21} />
                    </span>
                    <h3 className="font-display text-2xl font-black text-navy">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
                </TrackedLink>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="더 읽어볼 글" description="인스타에서 다 못 적은 지표 설명, 조건식 예시, 모의투자 기록법을 정리합니다." />
          <div className="grid gap-4 md:grid-cols-3">
            {blogPosts
              .filter((post) => ["volume-breakout-fail", "red-blue-watchlist", "stop-loss-before-condition"].includes(post.slug))
              .map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
          </div>
          <div className="mt-8 text-center">
            <TrackedLink href="/blog" eventName="guide_anchor_click" properties={{ label: "웹블로그 전체 보기" }} className="rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white">
              웹블로그 전체 보기
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading title="나중에 더 깊게 보고 싶다면" description="무료 혜택을 먼저 담아둔 뒤, 필요한 사람만 상품과 프리미엄 노트로 넘어가면 됩니다." />
          <div className="grid gap-4 md:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-14">
        <div className="mx-auto max-w-4xl px-4">
          <DisclosureBanner />
        </div>
      </section>
    </div>
  );
}

function GuideBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9 border-t border-line pt-7">
      <h3 className="font-display text-2xl font-black text-navy">{title}</h3>
      <div className="mt-4 text-base leading-8 text-charcoal">{children}</div>
    </section>
  );
}
