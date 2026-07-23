import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap nav-wrap">
        <Link className="wordmark" href="/" aria-label="Ramadhan Ghazy Henanto, home">
          <span>RGH</span><strong>Ramadhan<br />Ghazy Henanto</strong>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/#work">Work</Link>
          <Link href="/clientops">Live dashboard</Link>
          <a href="https://github.com/ramadhanghazy">GitHub ↗</a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>© 2026 Ramadhan Ghazy Henanto</p>
        <p>Built with AI assistance. Reviewed and tested by a human.</p>
        <a href="https://github.com/ramadhanghazy">@ramadhanghazy ↗</a>
      </div>
    </footer>
  );
}
