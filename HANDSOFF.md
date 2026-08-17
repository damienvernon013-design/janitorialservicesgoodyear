# Handoff — janitorialservicesgoodyear.com

**Status: READY TO LAUNCH**

## What this is

A 43-page static HTML microsite for a janitorial services company serving Goodyear, AZ and the
West Valley. No build step, no framework — plain HTML/CSS plus two small vanilla-JS files and one
Vercel serverless function. Deployed on Vercel, repo already connected.

## What was done in this pass

- Removed a stray junk directory at the project root left over from a bad `mkdir` brace-expansion
  (`{about,contact,...}`) — it was empty, not part of the site.
- Added `/api/quote.js`, a Vercel serverless function that receives the quote form submission and
  forwards it to the CRM-QM `push_lead` endpoint server-side. The CRM bearer token is never sent
  to the browser — it's read from the `CRM_API_TOKEN` environment variable at request time.
- Wired the form on `/request-a-quote/` to POST to `/api/quote` via `fetch` (see `quote-form.js`).
  On success it shows an inline confirmation; on failure it tells the visitor to call the phone
  number instead. The form still degrades to a plain HTML POST if JS fails to load (`action`
  attribute is left in place, though there is no server-side HTML form handler — see "Known gaps"
  below).
- Added `utm.js`, loaded on all 43 pages. It captures `utm_source`, `utm_medium`, `utm_campaign`,
  `utm_term`, `utm_content`, `gclid`, `fbclid` from the landing URL's query string into
  `sessionStorage`, so attribution survives navigation to `/request-a-quote/` from any entry page.
  The quote form reads `utm_source` back out of storage and includes it in the CRM payload.
- Added `vercel.json` with baseline security headers (nosniff, frame-deny, HSTS, referrer policy).
- Added `.gitignore` and `.env.example` for local env var hygiene.
- Confirmed there are no hardcoded secrets, no placeholder/lorem-ipsum content, and no leftover
  `{{ }}` template tokens anywhere in the tree.

## Required setup before go-live

1. In the Vercel project dashboard, set the environment variable:
   - `CRM_API_TOKEN` = the bearer token from the CRM-QM API doc (Production + Preview).
   Do **not** commit this value anywhere. It is intentionally absent from the repo.
2. Deploy (repo is already connected to Vercel — a normal `git push` to `main` triggers it).

## Known gaps / things a future session should look at

- **No testing was done for the CRM integration** (per explicit instruction — "no testing crm").
  The `/api/quote` function has not been exercised against the live CRM endpoint. First real
  submission after deploy should be manually verified in the CRM.
- The form's `action="/request-a-quote/" method="post"` attribute is vestigial — with JS enabled,
  `quote-form.js` intercepts submit and calls `/api/quote` instead. With JS disabled, the form
  would POST back to the page itself with no handler and effectively no-op. If no-JS support
  matters, add a fallback (e.g. a Vercel function bound to that route, or a `<noscript>` notice).
- The industry ID (`23`) and service→answer_id mapping in `api/quote.js` were inferred from the
  sample payload in the CRM API doc. **Confirm the real `answer_id` values for the three service
  options with the CRM/ops team** — they're currently placeholders (`101`–`104`) based on the
  doc's example structure, not confirmed IDs from the CRM.
- `zip` is collected nowhere on the current form (the CRM payload expects it) — currently sent as
  an empty string. Consider adding a ZIP field to the form if the CRM requires it for routing.
- No `GetFaq` integration — the FAQ page content is static and hand-written; left as-is since it
  reads as intentional, curated content rather than something to swap for a live feed.
