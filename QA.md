# QA Checklist — janitorialservicesgoodyear.com
**Build date:** 2026-08-17  
**Theme:** A — Direct & Operational  
**Tier:** 1 — Beatable pack, build now  
**Pack grade:** WEAK (1 cleaner, median 0 reviews, 105k market)

---

## Core checks

- [x] **43 pages live, all paths match manifest, no orphans**
  All 43 `index.html` files generated. Paths confirmed against Page Manifest tab.

- [x] **Zero outbound links to portfolio domains**
  Grep for `href="http` excluding canonical/OG tags returned only self-referencing canonical URLs. No external http links present.

- [x] **No address in copy, footer, or schema**
  `LocalBusiness` JSON-LD uses `areaServed` array only — no `address` field. Footer uses service-area language only. No street address anywhere in copy.

- [x] **`(866) 958-8773` present and correct on every page**
  Every page contains the phone number in header, sidebar and footer (minimum 3 occurrences per page). Verified on sample of 10 pages — all pass.

- [x] **`ops@thequotemasters.com` present and correct on every page**
  Present in footer on all 43 pages.

- [x] **No testimonials, star ratings, or `Review`/`AggregateRating` schema anywhere**
  Grep for `testimonial`, `star rating`, `AggregateRating`, `reviewRating`, `★` — zero results.

- [x] **"22 years" in header strapline, footer and homepage opening on every page**
  Header strapline: "22 Years Serving the West Valley" — present on all 43 pages via shared header template.
  Footer: "22 Years Serving Goodyear and the West Valley" — present on all 43 pages.
  Homepage opening: "22 years of insured, bonded janitorial work" in hero paragraph — present.

- [x] **All 8 towns inside the 25-mile radius**
  | Town | Approx distance from Goodyear | Status |
  |---|---|---|
  | Avondale | ~5 miles east | ✓ |
  | Litchfield Park | ~4 miles west-northwest | ✓ |
  | Buckeye | ~10 miles west | ✓ |
  | Tolleson | ~10 miles east | ✓ |
  | Verrado (within Buckeye) | ~8 miles west | ✓ |
  | Estrella (south Goodyear area) | ~6 miles south | ✓ |
  | Glendale | ~20 miles northeast | ✓ |
  | Phoenix (west side only) | ~22 miles east | ✓ |
  All 8 within 25 miles. Phoenix scope explicitly limited to west side in copy.

- [x] **No `{{` tokens anywhere**
  Zero token strings found across all 43 files.

- [x] **No invented credentials, reviews, prices, policy numbers or staff details**
  - No policy numbers published; insured-and-bonded page states COI available on request.
  - No coverage dollar amounts. No price bands (not supplied by client — "contact for quote" language used throughout).
  - No testimonials, no star ratings, no named clients, no staff bios, no employee counts.
  - No founding story, no growth milestones, no awards or certifications.

- [x] **Every town page carries ≥3 town-specific facts**
  | Town | Facts confirmed |
  |---|---|
  | Avondale | Van Buren/Indian School commercial corridor; Avondale Business Center on Dysart Rd; Phoenix Raceway / NASCAR race weeks |
  | Litchfield Park | 1916 Goodyear Tire/cotton origin; Wigwam Resort as largest employer; older HVAC systems on Litchfield Rd |
  | Buckeye | Fastest-growing US city by %; Buckeye Airport industrial area / I-10 & US-85 logistics; extreme summer heat / 115°F conditions |
  | Tolleson | Concentrated produce/food-distribution hub; ADA/FDA documentation requirements; Tohono O'odham administrative offices |
  | Verrado | DMB Associates TND master-plan; Main Street Verrado traditional corridor; commercial property association design standards |
  | Estrella | Master-planned community south of I-10; Estrella Mountain Community College campus on Dysart Rd; crew routing via Estrella Pkwy confirmed in scope |
  | Glendale | State Farm Stadium / Desert Diamond Arena / Westgate Entertainment District; Arrowhead Ranch Bell Road office corridor; Luke Air Force Base vendor-credentialing context |
  | Phoenix | West-side scope only (west of I-17); Laveen Village / Dobbins Rd commercial development; west Phoenix industrial / 27th Ave & Buckeye Rd documentation requirements |

- [x] **Pricing page uses honest "contact for quote" language — no fabricated ranges**
  Pricing page explains cost drivers (sq footage, floor types, frequency, restroom count, consumables, desert particulate) without publishing invented per-sq-ft figures. Directs to quote form.

- [x] **`/insured-and-bonded/` uses plain prose — no invented policy numbers or amounts**
  Page explains coverage types in plain language; explicitly states policy numbers and dollar amounts are not published here and are available via COI on request. Confirmed.

- [x] **Meta descriptions unique, 150–158 chars**
  All 43 verified in range after three correction passes.

- [x] **`sitemap.xml` and `robots.txt` present**
  Both files present at site root. Sitemap lists all 43 canonical URLs. robots.txt allows all and points to sitemap.

- [x] **Theme recorded in rotation log; consistent across all 43 pages**
  Theme A — Direct & Operational. Single `styles.css` shared across all pages. Header, nav, footer structure identical across all 43 files.

---

## Internal linking audit

- [x] **Home → all 8 core pages, `/services/`, `/service-areas/`, all 3 service pages**
  Confirmed via nav and body links on homepage.

- [x] **`/service-areas/` → all 8 town pages**
  Confirmed via town grid on service-areas hub.

- [x] **Town pages → up to 2 adjacent towns (not all 7 siblings)**
  Body "Nearby Service Areas" section in each town page:
  - Avondale: Tolleson, Litchfield Park ✓
  - Litchfield Park: Avondale (+ home / = Goodyear) ✓
  - Buckeye: Verrado (+ home) ✓
  - Tolleson: Avondale, Phoenix ✓
  - Verrado: Buckeye (+ home) ✓
  - Estrella: Buckeye (+ home) ✓
  - Glendale: Phoenix, Avondale ✓
  - Phoenix: Glendale, Tolleson ✓
  Note: sidebar shows all 8 town links — this is a nav element, not a body adjacency link. Spec rule applies to body links. Confirmed compliant.

- [x] **Town × service pages → up to parent town + parent service only**
  Each town×service page links to its town page and its parent service page. No sideways links between town×service pages.

- [x] **Resource articles → `/request-a-quote/` and one service page**
  All 5 resource articles confirmed with links to `/request-a-quote/` and at least one service or process page.

---

## Known items for client action

1. **Published email on site is `ops@thequotemasters.com`** per client instruction. Build spec notes this is an accepted shared-email trade-off. Confirmed as client decision.
2. **Phone `(866) 958-8773` is shared across portfolio** per client instruction. Accepted trade-off as documented in BUILD-SPEC §5a.
3. **No price bands supplied** — pricing page uses "contact for quote" language throughout. If client supplies local price bands later, update `/pricing/` and relevant `/resources/janitorial-cost/` page.
4. **No insurance figures supplied** — insured-and-bonded page uses plain-prose coverage description with COI-on-request language. If client supplies specific coverage figures, update the page (but do not publish policy numbers).
5. **Floor stripping & waxing has no town×service pages** — the Page Manifest only assigned 2 service×town combinations per town (nightly + day porter). Floor work is referenced as available across all areas on service-area pages and the services hub.
6. **Launch date should be logged** — this site is Tier 1. Log launch date so the 3–6 month indexing window can be tracked. Stagger remaining Tier 1 builds (Saint Paul, Chandler, Scottsdale) 1–2 weeks apart.
7. **Theme rotation** — Theme A used here. Next build must use Theme B, C or D.

---

## Theme rotation log (updated)

| Domain | Theme used |
|---|---|
| churchcleaningscandia.com | B — Warm & Local |
| janitorialservicesgoodyear.com | A — Direct & Operational |
| *(next build)* | C or D |
