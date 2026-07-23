# Ramadhan Ghazy Henanto — Portfolio

A public portfolio built around working software and verifiable engineering evidence.

## What is included

- `/` — portfolio home and selected work
- `/clientops` — interactive sales pipeline dashboard
- `/work/clientops` — ClientOps product and engineering case study
- `/work/bacadengar` — case study for a private Android reading and listening app
- `/api/leads` — validated, searchable, filterable, sortable lead list
- `/api/metrics` — pipeline KPI and stage aggregates
- `/api/leads/export.csv` — CSV export that follows active filters

ClientOps uses 60 synthetic records. No real customer or personal data is included.

## Stack

- Next.js and TypeScript
- Cloudflare Workers through vinext
- Cloudflare D1 with Drizzle migrations
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

`npm test` creates a production build and runs the logic and endpoint-response test suite.

## Data and privacy

- All ClientOps records are synthetic.
- The BacaDengar source repository remains private.
- Raw BacaDengar screenshots containing copyrighted book text are intentionally excluded.
- No passwords, wallet secrets, API keys, or private customer records belong in this repository.

## Author

Ramadhan Ghazy Henanto — [@ramadhanghazy](https://github.com/ramadhanghazy)
