# janitorialservicesgoodyear.com

Static HTML microsite for a janitorial services company in Goodyear, AZ: 43 core pages plus a
26-post `/blog/`. No build step — plain HTML/CSS, a UTM-capture script, a multi-step CRM quote
wizard script, one Vercel serverless function. Deployed on Vercel, connected via git; a push to
`main` deploys.

## Structure

- Every page is `<dir>/index.html` for clean URLs. Root pages (`about/`, `pricing/`, etc.), nested
  `service-areas/<town>/<service>/` and `services/<service>/` combinations, and `blog/<slug>/`.
- All pages (70 total) share identical header/nav/footer markup, copied inline into each file (no
  templating system). If you change the header, nav, or footer, you must change it in every file —
  there is no shared partial. Use a loop/script across all `index.html` files rather than hand-
  editing them one by one.
- `styles.css` at the root is the single stylesheet for every page, including the wizard-specific
  `.wiz-*` classes appended at the end of the file.
- `utm.js` at the root is loaded on every page (`<script src="/utm.js" defer>`), captures UTM
  params into `sessionStorage`.
- `assets/js/quote-wizard.js` is loaded only on `/request-a-quote/`. It renders a multi-step CRM
  quote wizard (question set, answer IDs, time slots, and the industry list are a snapshot of the
  CRM's fixed `get_lead_faq` schema — not site-specific, don't hand-edit these values here). The
  home page hero form is a short teaser (`data-lead-teaser`, name/phone/sqft) that GET-submits to
  `/request-a-quote/?name=&phone=&sqft=`; the wizard's `prefillFromQuery()` reads those params back.
- `/api/submit-lead.js` is a Vercel serverless function (Node) that validates the wizard's payload
  and proxies it to the CRM-QM `push_lead` endpoint. It reads `CRM_API_TOKEN` from the environment
  — never hardcode it. Per-site constants (`ZIP_DEFAULT`, `ADDRESS_DEFAULT`, `SITE_SOURCE_TAG`,
  CORS origin) are set for this domain; `SITE_SOURCE_TAG` is how a lead gets attributed back to
  this site in a CRM shared across the whole portfolio — never remove it.
- `blog/index.html` is the blog hub; each `blog/<slug>/index.html` is a static post using the same
  `LocalBusiness`-only JSON-LD as every other page (no `Article`/`BlogPosting` schema, no
  author/byline/date).

## Working in this repo

- No package.json, no bundler, no test runner. Don't introduce one unless asked.
- When editing shared chrome (header/nav/footer), use a loop/script across all `index.html` files
  rather than editing by hand.
- Content tone is deliberately plain and specific (real West Valley town facts, no invented
  reviews/pricing/credentials) — see `QA.md` for the standards this site was built and audited
  against. Preserve that tone; don't add generic marketing filler. This applies to `/blog/` too:
  no fabricated dollar figures, no named-study citations that can't be verified, "contact for
  quote" language only.
- The CRM API contract (endpoints, auth, payload shape) lives in the CRM-QM API doc the client
  shared — not duplicated here. See `HANDSOFF.md` for what's already wired up and what's still
  unconfirmed (notably the unconfirmed `ZIP_DEFAULT` in `api/submit-lead.js`).
- CRM integration has not been tested against the live endpoint per explicit client instruction.
  Don't assume it works end-to-end without checking with the user first.
- Footer includes a "Built and Maintained by Infin8Content" credit line (linked to
  infin8content.com) on every page — keep it in place when editing footer markup.
- **All CTAs point to `https://teamleadgeneration.com/contact/`** (every "Get a Quote"-style link
  and the home hero teaser form's `action`) — not to `/request-a-quote/`. Use that URL for any new
  CTA. The on-site wizard, `assets/js/quote-wizard.js` and `/api/submit-lead.js` remain deployed
  but are no longer linked from anywhere; don't remove them without asking the user.
