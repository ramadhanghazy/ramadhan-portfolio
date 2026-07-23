import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChartLineUp,
  DeviceMobile,
  GithubLogo,
} from "@phosphor-icons/react/ssr";
import { SiteFooter, SiteHeader } from "@/app/components/SiteChrome";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected product work by Ramadhan Ghazy Henanto: operational dashboards and a private Android reading app.",
};

export default function Home() {
  return (
    <div className="home-page">
      <SiteHeader />
      <main className="home-main">
        <section className="home-intro wrap">
          <div>
            <p className="home-kicker">RAMADHAN GHAZY HENANTO</p>
            <h1>Internal tools, dashboards, and small web apps.</h1>
          </div>
          <div className="home-intro-copy">
            <p>Two working examples covering a web dashboard and a private Android reading app.</p>
            <a className="home-pill home-pill-dark" href="https://github.com/ramadhanghazy">
              <GithubLogo size={14} weight="regular" aria-hidden />
              View GitHub
            </a>
          </div>
        </section>

        <section className="home-projects wrap" id="work">
          <header className="home-section-header">
            <h2>Selected projects</h2>
            <span>02 projects</span>
          </header>

          <div className="home-project-grid">
            <article className="home-project-card">
              <Link className="home-project-media" href="/clientops" aria-label="Open ClientOps live dashboard">
                <Image
                  src="/clientops-preview.png"
                  alt="ClientOps sales pipeline dashboard"
                  width={1440}
                  height={900}
                  priority
                />
              </Link>
              <div className="home-project-body">
                <div className="home-project-meta">
                  <span className="home-card-icon"><ChartLineUp size={20} weight="regular" aria-hidden /></span>
                  <span>Web application</span>
                  <span>2026</span>
                </div>
                <div className="home-project-title">
                  <h3>ClientOps</h3>
                  <span>Live demo</span>
                </div>
                <p>Sales pipeline dashboard with filters, metrics, lead details, and CSV export.</p>
                <div className="home-card-actions">
                  <Link className="home-pill home-pill-dark" href="/clientops">
                    Open product <ArrowUpRight size={14} weight="regular" aria-hidden />
                  </Link>
                  <Link className="home-text-link" href="/work/clientops">
                    Case study <ArrowUpRight size={14} weight="regular" aria-hidden />
                  </Link>
                </div>
              </div>
            </article>

            <article className="home-project-card">
              <Link className="home-project-media home-project-media-contain" href="/work/bacadengar" aria-label="Read the BacaDengar case study">
                <Image
                  src="/bacadengar-hero.png"
                  alt="BacaDengar Android reading and listening app"
                  width={1600}
                  height={900}
                  priority
                />
              </Link>
              <div className="home-project-body">
                <div className="home-project-meta">
                  <span className="home-card-icon"><DeviceMobile size={20} weight="regular" aria-hidden /></span>
                  <span>Android application</span>
                  <span>2026</span>
                </div>
                <div className="home-project-title">
                  <h3>BacaDengar</h3>
                  <span>Private</span>
                </div>
                <p>Local-first reader that keeps book pages and offline audio in one continuous session.</p>
                <div className="home-card-actions">
                  <Link className="home-pill home-pill-light" href="/work/bacadengar">
                    Read case study <ArrowUpRight size={14} weight="regular" aria-hidden />
                  </Link>
                  <span className="home-private-note">Source remains private</span>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
