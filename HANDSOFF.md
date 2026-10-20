# Handoff — janitorialservicesgoodyear.com

**Status: BLOG + WIZARD BUILT — NOT YET LIVE-TESTED. ALL SITE CTAs NOW POINT EXTERNALLY (see below).**

## What this is

A static HTML microsite for a janitorial services company serving Goodyear, AZ and the West
Valley: 43 core pages plus a new 26-post `/blog/`. No build step, no framework — plain HTML/CSS
plus a UTM-capture script, a multi-step CRM quote wizard script, and one Vercel serverless
function. Deployed on Vercel, repo already connected.

## CTA redirect (latest change)

- Every CTA on the site (header, hero, inline, sidebar, footer, blog; 276 links across 70 files) and
  the home hero teaser form `action` now point to **https://teamleadgeneration.com/contact/**
  instead of `/request-a-quote/`. The `mailto:ops@thequotemasters.com` footer links are unchanged.
- As a result the on-site wizard (`/request-a-quote/`, `assets/js/quote-wizard.js`,
  `api/submit-lead.js`) is **orphaned but still deployed** — nothing links to it. Decide whether to
  keep, redirect, or remove it. The teaser form still appends `name`/`phone`/`sqft` query params,
  which the external site likely ignores.
- New CTAs should use the external URL, not `/request-a-quote/`. Not click-tested in a browser.

## What was done in this pass

- Added a 26-post `/blog/` section (25 topics from a shared portfolio content pack, rewritten for
  Goodyear/West Valley branding and facts, plus one extra walkthrough-process post) and a
  `/blog/index.html` hub. All posts use `LocalBusiness`-only JSON-LD (no author/byline/date), no
  fabricated pricing figures (per this site's existing "contact for quote" standard), and softened
  versions of any named-study citations from the source pack that could not be verified in this
  session. Three posts that in the source pack were written as direct restaurant/gym/school service
  claims were reframed as general facility-hygiene guidance, since this site's actual scope
  (`/services/`) is commercial/industrial/office/medical janitorial only.
- Added `Blog` to the sitewide nav and footer across all 43 existing pages, and added all 26 post
  URLs plus the `/blog/` hub to `sitemap.xml` (`changefreq weekly`).
- **Replaced the old single-step quote form with a full CRM-integrated multi-step quote wizard**:
  - `assets/js/quote-wizard.js` — the wizard client. Question set, answer IDs, time slots and the
    43-item industry list are fixed CRM questionnaire schema (`get_lead_faq`), not site-specific —
    treat this file as a byte-for-byte copy across the portfolio, not something to hand-edit here.
  - `api/submit-lead.js` — replaces the old `api/quote.js` (deleted). Validates and forwards the
    wizard's payload to the same CRM `push_lead` endpoint. Per-site values set for this domain:
    `ZIP_DEFAULT = '85338'`, `ADDRESS_DEFAULT = 'Goodyear, AZ'`,
    `SITE_SOURCE_TAG = 'Site: janitorialservicesgoodyear.com'`, and the CORS origin set to
    `https://janitorialservicesgoodyear.com`.
  - `/request-a-quote/` now renders the wizard scaffold (`data-quote-wizard`,
    `data-wizard-progress/steps/status/nav/back/next`) instead of the old single-page form.
  - The home page hero form was converted to a short teaser (name + phone + sqft, GET-submits to
    `/request-a-quote/`); the wizard's own `prefillFromQuery()` reads `?name=&phone=&sqft=` and
    prefills step 1 automatically. `/contact/` never had a quote form (just contact info + a link
    to `/request-a-quote/`), so it needed no change.
  - Deleted `api/quote.js` and `quote-form.js` — fully superseded by the above. Grepped the whole
    repo afterward for both filenames and for `data-lead-form`; zero references remain.
  - Appended a `/* Quote wizard */` CSS block to `styles.css` using the site's existing
    `--primary`/`--accent` tokens — no new colors introduced.
- **`ZIP_DEFAULT` (85338) is a real, well-known Goodyear ZIP but has not been explicitly confirmed
  by the client** — flag this the same way the original town-radius verification was flagged, and
  confirm before go-live if the CRM uses ZIP for routing decisions.
- Confirmed no hardcoded secrets, no fabricated dollar figures, and no leftover references to the
  old form/API anywhere in the tree.
- Added a "Built and Maintained by Infin8Content" credit line (linked to
  `https://infin8content.com/`) as the last line in `.footer-bottom` on all 70 pages.

## Required setup before go-live

1. In the Vercel project dashboard, confirm the environment variable `CRM_API_TOKEN` is still set
   (Production + Preview) — unchanged from before, `api/submit-lead.js` reads the same variable
   name as the old `api/quote.js` did.
2. Deploy (repo is already connected to Vercel — a normal `git push` to `main` triggers it).

## Known gaps / things a future session should look at

- **No live CRM submission test was performed** (per explicit client instruction — "no testing
  crm" — carried forward from the original build). Neither the old form nor the new wizard has
  been exercised against the live CRM endpoint from this session. `node --check` passed on both
  new JS files as a syntax-safety substitute, but that is not a functional test.
- **No real-browser click-through of the wizard was done** — this session has no browser or Vercel
  preview-deploy access. Before this goes live, click through the full wizard end to end on a
  preview deploy: all question steps, the appointment-slot step (including the same-day
  90-minute-gap validation), the details step, the review step, and a real test submission
  verified in the CRM afterward.
- `ZIP_DEFAULT = '85338'` was chosen as a real, recognizable Goodyear ZIP but is not
  client-confirmed — verify if the CRM uses it for lead routing.
- The wizard's industry list and question set are a **snapshot** of the CRM's `get_lead_faq`
  response, not a live source — re-fetch and update `assets/js/quote-wizard.js` if the CRM's
  questionnaire schema changes.
- No `GetFaq` integration — the FAQ page content is static and hand-written; left as-is since it
  reads as intentional, curated content rather than something to swap for a live feed.
