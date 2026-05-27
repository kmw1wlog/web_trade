# AGENTS.md

## Product Direction

This project is not a blog-first site.
This project is not a hard-sales-first checkout site.
This project is not a crypto referral or trading signal dashboard.

This project is an SNS-traffic landing hub where visitors first save free benefits, then learn how to use the web through a scrollable guide.

Primary goal:
Convert Instagram, Twitter/X, Shorts, and blog visitors into one of these soft commitments:
- 3-day / 10-use free coupon
- free indicators and ebook kit
- premium trial waitlist
- web tool trial
- app beta waitlist
- course/tool preorder waitlist

The homepage must feel like a card-first benefit hub, not a long hero landing page.

## Homepage Priority

The homepage section order must be:

1. Compact header copy with six free-benefit cards immediately visible
2. Scrollable guide article explaining how to use the web
3. Coupon claim panel
4. Tool preview
5. Free kit
6. Premium trial
7. App beta
8. Preorder
9. Community
10. Blog preview
11. Optional product preview
12. Disclosure

Never let a large hero paragraph, blog posts, paid product grid, API waitlist, or crypto content take priority above the six benefit cards.

## Navigation

Main nav:
- 무료혜택
- 지표/기능
- 이용가이드
- 웹블로그
- 앱/사전예약
- 제휴문의

Do not put crypto in the main nav.

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

## Design Style

Keep the navy, gold, cream, green, line, and white card system.
The first screen should resemble a clean card shelf: compact copy, large clickable cards, clear benefits, and strong tap targets.
The guide section should read like a blog/article guide, with index and anchor links.

Avoid:
- long explanation-first hero
- dashboard-first look
- blog-first look
- aggressive paid checkout pressure
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
“Save free benefits first, then use the guide to decide what to try.”

It must not communicate:
“This is a blog.”
“This is only a paid checkout page.”
“This is a crypto referral site.”

Run lint, test, and build before finishing when feasible.
