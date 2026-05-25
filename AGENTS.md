# AGENTS.md

## Product Direction

This project is not a blog-first site.
This project is not a free-resource hub.
This project is not a generic dashboard.

This project is a sales-first landing website for paid investment routine products.

Primary goal:
Show paid products first and convert Instagram traffic into one of these offers:
- ebook
- premium notes
- web tools
- mock trading league
- course waitlist
- app beta waitlist

The homepage must feel like an expert-led product sales landing page.

## Homepage Priority

The homepage section order must be:

1. Hero with paid product CTA
2. Paid product cards
3. Problem framing
4. Flagship ebook section
5. Product recommendation section
6. Free preview section
7. Blog preview
8. Trust/review section
9. FAQ
10. Disclosure
11. Sticky CTA

Never put blog posts, free resources, dashboards, API waitlists, or crypto content above paid product cards.

## Navigation

Main nav:
- 상품
- 기능웹
- 웹블로그
- 모의투자
- 앱/강의 대기
- 제휴문의

Do not put free resources or crypto in the main nav.

## Routes

Use these primary routes:
- /
- /products
- /products/ebook
- /products/premium-notes
- /products/web-tools
- /products/mock-league
- /products/course
- /products/app
- /blog
- /blog/[slug]
- /tools
- /mock
- /waitlist
- /partners
- /crypto-gate
- /disclosure
- /privacy
- /terms

If old `/articles` exists, redirect or migrate it to `/blog`.
If old `/free` exists, it must not be a homepage priority.

## Design Style

Expert-led sales landing.
Clean white/cream background.
Dark navy/charcoal typography.
Gold/green accent.
Large hero.
Strong product cards.
Clear prices.
Clear CTAs.
Mobile sticky CTA.

Avoid:
- dashboard-first look
- blog-first look
- free-tool-directory look
- crypto trading room aesthetic
- exaggerated profit claims

## Investment Safety

Never use:
- buy now
- sell now
- guaranteed profit
- monthly return
- loss compensation
- principal guarantee
- VIP signals
- copy trading
- managed fund
- discretionary investment
- real-time entry point

Use:
- observation condition
- review case
- failure condition
- risk criterion
- checklist
- simulated trading example
- trading routine
- educational material

## Definition of Done

The homepage must immediately communicate:
“This is a paid product sales site for organizing trading routines.”

It must not communicate:
“This is a blog.”
“This is a free resource library.”
“This is a dashboard.”
“This is a crypto referral site.”

Run lint and build before finishing.
