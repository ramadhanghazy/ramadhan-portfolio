import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/app/components/SiteChrome";

export const metadata: Metadata = {
  title: "ClientOps case study",
  description: "How a sales pipeline dashboard was scoped, built, and verified.",
};

export default function ClientOpsCaseStudy() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="case-hero dark-case">
          <div className="wrap case-hero-grid">
            <div>
              <p className="eyebrow">CLIENTOPS · WEB APPLICATION · 2026</p>
              <h1>A sales dashboard for keeping follow-ups visible.</h1>
              <p>ClientOps puts lead status, value, ownership, and next actions in one responsive workspace.</p>
              <div className="button-row"><Link className="button coral" href="/clientops">Open the live product ↗</Link><a className="button dark-outline" href="https://github.com/ramadhanghazy/ramadhan-portfolio">View source ↗</a></div>
            </div>
            <div className="case-stat-block">
              <div><strong>60</strong><span>Synthetic lead records</span></div>
              <div><strong>03</strong><span>Purpose-built API routes</span></div>
              <div><strong>100%</strong><span>Demo data—no client PII</span></div>
            </div>
          </div>
        </section>

        <section className="case-summary wrap">
          <div><span>ROLE</span><p>Product scope, implementation, testing, and documentation</p></div>
          <div><span>STACK</span><p>Next.js, TypeScript, D1, Cloudflare Workers</p></div>
          <div><span>FOCUS</span><p>Data clarity, responsive UX, export workflow, tests</p></div>
        </section>

        <section className="case-section wrap narrative-grid">
          <div><p className="eyebrow">THE PROBLEM</p><h2>A lead list does not show what needs attention.</h2></div>
          <div><p>Small teams often track opportunities in spreadsheets. As the list grows, follow-up dates, ownership, and deal status become harder to review.</p><p>ClientOps was scoped to answer four questions: how much is in the active pipeline, which leads need attention, who owns each opportunity, and what should happen next?</p></div>
        </section>

        <section className="case-feature dark-case">
          <div className="wrap">
            <div className="section-heading light-heading"><div><p className="eyebrow">THE PRODUCT</p><h2>Core workflow</h2></div><p>The dashboard supports five repeated actions: review, filter, prioritize, inspect, and export.</p></div>
            <div className="feature-grid">
              <article><span>01</span><h3>Scan the whole pipeline</h3><p>Four KPIs and stage distribution establish context before the user reaches the lead table.</p></article>
              <article><span>02</span><h3>Narrow without losing context</h3><p>Search and filters sync to the URL, making focused views reproducible and shareable.</p></article>
              <article><span>03</span><h3>Inspect in place</h3><p>A detail drawer keeps users anchored in their current list while showing the full lead record.</p></article>
              <article><span>04</span><h3>Take the data with you</h3><p>CSV export respects active filters and safely escapes commas, quotes, and line breaks.</p></article>
            </div>
          </div>
        </section>

        <section className="case-section wrap">
          <div className="section-heading"><div><p className="eyebrow">SYSTEM DESIGN</p><h2>Architecture</h2></div><p>D1 stores the lead records. Server routes return paginated lists, aggregate metrics, and filtered CSV output.</p></div>
          <div className="architecture" aria-label="ClientOps architecture diagram">
            <div><span>INTERFACE</span><strong>Responsive dashboard</strong><small>Filters · Table · Drawer · States</small></div><b>→</b>
            <div><span>SERVER</span><strong>Next.js route handlers</strong><small>Validation · Metrics · CSV</small></div><b>→</b>
            <div><span>DATA</span><strong>Cloudflare D1</strong><small>60 synthetic lead records</small></div>
          </div>
        </section>

        <section className="case-section warm-section">
          <div className="wrap narrative-grid">
            <div><p className="eyebrow">VERIFICATION</p><h2>Tests and interface states</h2></div>
            <div>
              <ul className="check-list">
                <li><span>✓</span><div><strong>Logic tests</strong><p>Query parsing, sorting, pagination, KPI calculations, and CSV escaping.</p></div></li>
                <li><span>✓</span><div><strong>Route tests</strong><p>Successful responses, invalid parameters, empty results, and filtered exports.</p></div></li>
                <li><span>✓</span><div><strong>Responsive QA</strong><p>Desktop, tablet, and mobile layouts, including cards that replace the table on narrow screens.</p></div></li>
                <li><span>✓</span><div><strong>Failure states</strong><p>Loading, error, no-results, disabled pagination, focus visibility, and keyboard-friendly controls.</p></div></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="next-project wrap">
          <p className="eyebrow">NEXT PROJECT</p><h2>BacaDengar Android app</h2><Link className="button primary" href="/work/bacadengar">Read the case study →</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
