import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/app/components/SiteChrome";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected product work by Ramadhan Ghazy Henanto: operational dashboards and a private Android reading app.",
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Available for focused projects</p>
            <h1>Software that makes the next step obvious.</h1>
            <p className="hero-lede">
              I build web apps, dashboards, and automation with AI assistance—then verify
              the details with real tests and careful human review.
            </p>
            <div className="button-row">
              <Link className="button primary" href="/clientops">Explore the live dashboard <span aria-hidden>↗</span></Link>
              <a className="button secondary" href="https://github.com/ramadhanghazy">View GitHub <span aria-hidden>↗</span></a>
            </div>
          </div>
          <aside className="hero-proof" aria-label="Working principles">
            <p className="proof-label">HOW I WORK</p>
            <ol>
              <li><span>01</span><div><strong>Start with the workflow</strong><small>Clarify the user, friction, and measurable outcome.</small></div></li>
              <li><span>02</span><div><strong>Build the smallest useful system</strong><small>Keep scope tight, states complete, and data honest.</small></div></li>
              <li><span>03</span><div><strong>Verify before handoff</strong><small>Test behavior, responsive layouts, and failure cases.</small></div></li>
            </ol>
          </aside>
        </section>

        <section className="proof-strip" aria-label="Portfolio highlights">
          <div className="wrap proof-grid">
            <div><strong>02</strong><span>End-to-end case studies</span></div>
            <div><strong>60</strong><span>Synthetic CRM records</span></div>
            <div><strong>03</strong><span>Responsive breakpoints checked</span></div>
            <div><strong>0</strong><span>Real customer records exposed</span></div>
          </div>
        </section>

        <section className="section wrap" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SELECTED WORK</p>
              <h2>Two products. Two kinds of proof.</h2>
            </div>
            <p>One live operational tool and one documented private application—chosen to show product judgment, implementation, and verification.</p>
          </div>

          <div className="work-grid">
            <article className="project-card featured">
              <div className="project-visual dashboard-mini" aria-label="ClientOps dashboard preview">
                <div className="mini-bar"><span /><span /><span /></div>
                <div className="mini-grid">
                  <div className="mini-kpi"><small>PIPELINE</small><strong>$446k</strong><span>Qualified + proposal</span></div>
                  <div className="mini-kpi"><small>ACTIVE LEADS</small><strong>36</strong><span>Across three owners</span></div>
                  <div className="mini-chart">
                    {[52, 72, 45, 86, 63].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}
                  </div>
                </div>
                <div className="mini-table">
                  {["Northstar Studio", "Copper & Co. Foods", "Brightline Advisory"].map((name, i) => (
                    <div key={name}><span>{name}</span><em>{["Proposal", "Qualified", "New"][i]}</em><b>${[16150, 9250, 12025][i].toLocaleString()}</b></div>
                  ))}
                </div>
              </div>
              <div className="project-body">
                <div className="project-meta"><span>FLAGSHIP · WEB APPLICATION</span><span>2026</span></div>
                <h3>ClientOps</h3>
                <p>A compact sales pipeline dashboard that turns scattered lead activity into a clear daily operating view.</p>
                <ul className="tag-list"><li>Next.js</li><li>TypeScript</li><li>D1</li><li>API design</li><li>Testing</li></ul>
                <div className="card-links">
                  <Link href="/clientops">Open live product ↗</Link>
                  <Link href="/work/clientops">Read case study →</Link>
                </div>
              </div>
            </article>

            <article className="project-card">
              <div className="project-visual baca-visual">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/bacadengar-hero.png" alt="BacaDengar private Android reading and listening app" width="1200" height="675" />
              </div>
              <div className="project-body">
                <div className="project-meta"><span>PRIVATE ANDROID APPLICATION</span><span>2026</span></div>
                <h3>BacaDengar</h3>
                <p>A local-first reading and listening app designed around continuity, privacy, and calm long-form sessions.</p>
                <ul className="tag-list"><li>Kotlin</li><li>Jetpack Compose</li><li>Room</li><li>Media3</li><li>WorkManager</li></ul>
                <div className="card-links">
                  <Link href="/work/bacadengar">Read case study →</Link>
                  <span className="private-note">Source remains private</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section approach-section">
          <div className="wrap split-heading">
            <div><p className="eyebrow">A PRACTICAL PARTNER</p><h2>AI-assisted.<br />Human-verified.</h2></div>
            <div className="approach-copy">
              <p>I use AI to accelerate implementation and exploration. I remain responsible for the brief, decisions, review, testing, and final handoff.</p>
              <div className="capability-grid">
                <div><span>01</span><h3>Operational dashboards</h3><p>Turn messy tables and recurring checks into a focused interface.</p></div>
                <div><span>02</span><h3>Internal web tools</h3><p>Small systems with deliberate states, validation, and export paths.</p></div>
                <div><span>03</span><h3>Workflow automation</h3><p>Reduce manual handoffs with scripts, APIs, and clear failure handling.</p></div>
                <div><span>04</span><h3>Testing and QA</h3><p>Check core logic, routes, responsive layouts, and unhappy paths.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-block wrap">
          <p className="eyebrow">LET&apos;S BUILD SOMETHING USEFUL</p>
          <h2>Have a workflow that feels harder than it should?</h2>
          <p>See the implementation behind this portfolio, then start a conversation through GitHub.</p>
          <a className="button light" href="https://github.com/ramadhanghazy">Visit @ramadhanghazy on GitHub <span aria-hidden>↗</span></a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
