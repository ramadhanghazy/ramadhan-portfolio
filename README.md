# Ramadhan Ghazy Henanto — Portfolio

A portfolio containing a working web dashboard and an Android case study.

Live site: [ramadhanghazy.pages.dev](https://ramadhanghazy.pages.dev)

## What is included

- `/` — portfolio home and selected work
- `/clientops` — interactive sales pipeline dashboard
- `/work/clientops` — ClientOps product and engineering case study
- `/work/bacadengar` — case study for a private Android reading and listening app
- `/api/leads` — Cloudflare Pages Function for validated, searchable, sortable lead lists
- `/api/metrics` — Cloudflare Pages Function for pipeline KPIs
- `/api/leads/export.csv` — Cloudflare Pages Function for filtered CSV export

ClientOps uses 60 synthetic records. No real customer or personal data is included.

## Stack

- Next.js and TypeScript
- Cloudflare Pages and Pages Functions
- Node test runner and Playwright Core for verification

## Run locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm run lint
npm test
```

`npm test` creates a static production build and runs the logic and endpoint-response test suite.

## Data and privacy

- All ClientOps records are synthetic.
- The BacaDengar source repository remains private.
- Raw BacaDengar screenshots containing copyrighted book text are intentionally excluded.
- No passwords, wallet secrets, API keys, or private customer records belong in this repository.

## Author

Ramadhan Ghazy Henanto — [@ramadhanghazy](https://github.com/ramadhanghazy)
