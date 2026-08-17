# janitorialservicesgoodyear.com

Static HTML microsite (43 pages) for a janitorial services company in Goodyear, AZ. No build
step — plain HTML/CSS, two vanilla-JS files, one Vercel serverless function. Deployed on Vercel,
connected via git; a push to `main` deploys.

## Structure

- Every page is `<dir>/index.html` for clean URLs. Root pages (`about/`, `pricing/`, etc.) plus
  nested `service-areas/<town>/<service>/` and `services/<service>/` combinations.
- All 43 pages share identical header/nav/footer markup, copied inline into each file (no
  templating system). If you change the header, nav, or footer, you must change it in all 43
  files — there is no shared partial.
- `styles.css` at the root is the single stylesheet for every page.
- `utm.js` at the root is loaded on all 43 pages (`<script src="/utm.js" defer>`), captures UTM
  params into `sessionStorage`.
- `quote-form.js` is loaded only on `/request-a-quote/` and handles the quote form's async submit.
- `/api/quote.js` is a Vercel serverless function (Node) that proxies form submissions to the
  CRM-QM `push_lead` endpoint. It reads `CRM_API_TOKEN` from the environment — never hardcode it.

## Working in this repo

- No package.json, no bundler, no test runner. Don't introduce one unless asked.
- When editing shared chrome (header/nav/footer), use a loop/script across all `index.html` files
  rather than editing by hand 43 times.
- Content tone is deliberately plain and specific (real West Valley town facts, no invented
  reviews/pricing/credentials) — see `QA.md` for the standards this site was built and audited
  against. Preserve that tone; don't add generic marketing filler.
- The CRM API contract (endpoints, auth, payload shape) lives in the CRM-QM API doc the client
  shared — not duplicated here. See `HANDSOFF.md` for what's already wired up and what's still
  unconfirmed (notably the service→`answer_id` mapping in `api/quote.js`).
- CRM integration has not been tested against the live endpoint per explicit client instruction.
  Don't assume it works end-to-end without checking with the user first.
