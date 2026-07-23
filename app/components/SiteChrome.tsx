import Link from "next/link";
import { ChartLineUp, GithubLogo, SquaresFour } from "@phosphor-icons/react/ssr";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap nav-wrap">
        <Link className="wordmark" href="/" aria-label="Ramadhan Ghazy Henanto, home">
          <span>RG</span><strong>Ramadhan Ghazy Henanto</strong>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/#work"><SquaresFour size={14} weight="regular" aria-hidden /><span className="nav-label">Projects</span></Link>
          <Link href="/clientops"><ChartLineUp size={14} weight="regular" aria-hidden /><span className="nav-label">Dashboard</span></Link>
          <a href="https://github.com/ramadhanghazy"><GithubLogo size={14} weight="regular" aria-hidden /><span className="nav-label">GitHub</span></a>
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
        <p>Software projects and implementation notes.</p>
        <a href="https://github.com/ramadhanghazy">@ramadhanghazy</a>
      </div>
    </footer>
  );
}
