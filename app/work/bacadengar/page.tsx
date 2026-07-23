import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/app/components/SiteChrome";

export const metadata: Metadata = {
  title: "BacaDengar case study",
  description: "A private, local-first Android reading and listening app built with Kotlin and Jetpack Compose.",
};

export default function BacaDengarCaseStudy() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="case-hero baca-case">
          <div className="wrap case-hero-grid">
            <div>
              <p className="eyebrow">BACADENGAR · PRIVATE ANDROID APP · 2026</p>
              <h1>An Android app for local books and audio.</h1>
              <p>BacaDengar supports EPUB, PDF, TXT, and audio files, with saved progress and reader preferences.</p>
              <p className="private-callout"><span>PRIVATE SOURCE</span> Product decisions, architecture, and test evidence are documented here without exposing the repository or book content.</p>
            </div>
            <div className="baca-hero-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bacadengar-hero.png" alt="BacaDengar app hero showing its reading and listening interface" width="1200" height="675" />
            </div>
          </div>
        </section>

        <section className="case-summary wrap">
          <div><span>ROLE</span><p>Product scope, Android implementation, testing, and documentation</p></div>
          <div><span>STACK</span><p>Kotlin, Jetpack Compose, Room, Media3, WorkManager</p></div>
          <div><span>VERIFICATION</span><p>Gradle unit tests and debug APK build</p></div>
        </section>

        <section className="case-section wrap narrative-grid">
          <div><p className="eyebrow">THE PROBLEM</p><h2>Progress must persist between sessions.</h2></div>
          <div><p>Reading apps and audio players often treat a book as a file instead of an ongoing session. Losing the last position, changing display preferences repeatedly, or jumping between reading and listening creates friction that compounds over time.</p><p>BacaDengar was designed around continuity: import local content, remember progress, preserve preferences, and make returning feel immediate.</p></div>
        </section>

        <section className="case-section soft-dark">
          <div className="wrap">
            <div className="section-heading light-heading"><div><p className="eyebrow">PRODUCT DECISIONS</p><h2>Core features</h2></div><p>The app prioritizes local content, saved progress, and reader settings instead of accounts or social features.</p></div>
            <div className="feature-grid baca-features">
              <article><span>A</span><h3>Local-first library</h3><p>Import EPUB, PDF, TXT, and audio files without requiring an account or remote catalog.</p></article>
              <article><span>B</span><h3>Resume positions</h3><p>Store reading and playback progress so each title opens where the session ended.</p></article>
              <article><span>C</span><h3>Reader preferences</h3><p>Theme and font controls support different environments and long sessions.</p></article>
              <article><span>D</span><h3>Practical structure</h3><p>Basic chapter detection, bookmarks, background work, and media playback support navigation and continuity.</p></article>
            </div>
          </div>
        </section>

        <section className="case-section wrap">
          <div className="section-heading"><div><p className="eyebrow">ARCHITECTURE</p><h2>Android architecture</h2></div><p>Compose renders UI state. ViewModels coordinate application logic. Repositories isolate persistence and media operations.</p></div>
          <div className="mobile-architecture" aria-label="BacaDengar architecture diagram">
            <div><span>UI</span><strong>Jetpack Compose</strong><small>Library · Reader · Player · Settings</small></div>
            <i>↓ state & events</i>
            <div><span>LOGIC</span><strong>ViewModels + Coroutines</strong><small>Session state · Navigation · Async work</small></div>
            <i>↓ repositories</i>
            <div className="arch-split"><section><span>LOCAL DATA</span><strong>Room</strong><small>Books · Positions · Bookmarks</small></section><section><span>MEDIA</span><strong>Media3 + WorkManager</strong><small>Playback · Background tasks</small></section></div>
          </div>
        </section>

        <section className="case-section warm-section">
          <div className="wrap narrative-grid">
            <div><p className="eyebrow">ENGINEERING</p><h2>Main implementation challenges</h2></div>
            <div className="challenge-list">
              <article><strong>01</strong><div><h3>Stable progress persistence</h3><p>Reading and playback positions must update often enough to feel reliable without turning every interaction into unnecessary storage work.</p></div></article>
              <article><strong>02</strong><div><h3>Multiple content formats</h3><p>EPUB, PDF, TXT, and audio expose different structures. The interface needs one coherent library model without pretending the formats are identical.</p></div></article>
              <article><strong>03</strong><div><h3>Background-safe behavior</h3><p>Media and longer operations require lifecycle-aware components so activity state changes do not break the user&apos;s session.</p></div></article>
            </div>
          </div>
        </section>

        <section className="case-section wrap result-section">
          <div><p className="eyebrow">VERIFICATION</p><h2>Tests and debug build</h2><p>The project is checked using its Gradle test suite and debug build task. This case study uses one safe marketing visual and an abstract architecture diagram; raw reading screenshots and the private repository are not published.</p></div>
          <div className="verification-card">
            <span>LOCAL VERIFICATION</span>
            <code>.\gradlew.bat test assembleDebug</code>
            <ul><li>Unit tests</li><li>Debug APK build</li><li>Private source retained</li><li>No copyrighted book text shown</li></ul>
          </div>
        </section>

        <section className="next-project wrap">
          <p className="eyebrow">WEB PROJECT</p><h2>ClientOps sales dashboard</h2><Link className="button primary" href="/clientops">Open ClientOps ↗</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
