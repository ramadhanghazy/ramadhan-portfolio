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
            <p className="eyebrow">RAMADHAN GHAZY HENANTO · SOFTWARE PROJECTS</p>
            <h1>Internal tools and small web applications.</h1>
            <p className="hero-lede">
              I build focused software for repetitive business work: dashboards, data
              processing, and simple automation.
            </p>
            <div className="button-row">
              <Link className="button primary" href="/clientops">View ClientOps demo <span aria-hidden>↗</span></Link>
              <a className="button secondary" href="https://github.com/ramadhanghazy">View GitHub <span aria-hidden>↗</span></a>
            </div>
          </div>
          <aside className="hero-proof" aria-label="Portfolio contents">
            <p className="proof-label">IN THIS PORTFOLIO</p>
            <ol>
              <li><span>01</span><div><strong>ClientOps</strong><small>A working sales pipeline dashboard with filters, metrics, and CSV export.</small></div></li>
              <li><span>02</span><div><strong>BacaDengar</strong><small>A private Android app for local books and audio, documented as a case study.</small></div></li>
              <li><span>03</span><div><strong>Source and tests</strong><small>Public implementation, test coverage, and clear notes about private material.</small></div></li>
            </ol>
          </aside>
        </section>

        <section className="proof-strip" aria-label="Portfolio highlights">
          <div className="wrap proof-grid">
            <div><strong>WEB</strong><span>Next.js and TypeScript</span></div>
            <div><strong>APP</strong><span>Kotlin and Jetpack Compose</span></div>
            <div><strong>QA</strong><span>Logic, route, and responsive checks</span></div>
            <div><strong>SAFE</strong><span>Synthetic public data only</span></div>
          </div>
        </section>

        <section className="section wrap" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SELECTED WORK</p>
              <h2>Projects</h2>
            </div>
            <p>ClientOps is a public working demo. BacaDengar is a private Android project documented without exposing its repository or book content.</p>
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
            <div><p className="eyebrow">SERVICES</p><h2>What I can build</h2></div>
            <div className="approach-copy">
              <p>Small, well-defined software projects for teams that have outgrown a manual spreadsheet or repeated copy-paste work.</p>
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
          <p className="eyebrow">CONTACT</p>
          <h2>Code and project details are on GitHub.</h2>
          <p>Review the repository, tests, and implementation notes.</p>
          <a className="button light" href="https://github.com/ramadhanghazy">Open GitHub <span aria-hidden>↗</span></a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
