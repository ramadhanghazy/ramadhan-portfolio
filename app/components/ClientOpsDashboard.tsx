"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { OWNERS, SOURCES, STAGES, type Lead } from "@/lib/leads";

type Metrics = {
  pipelineValue: number;
  activeLeads: number;
  winRate: number;
  overdueFollowUps: number;
  byStage: { stage: string; count: number; value: number }[];
};

type ApiResponse = {
  items: Lead[];
  total: number;
  page: number;
  totalPages: number;
};

type Filters = {
  search: string;
  stage: string;
  source: string;
  owner: string;
  sort: string;
  direction: string;
  page: number;
  pageSize: number;
};

const emptyMetrics: Metrics = {
  pipelineValue: 0,
  activeLeads: 0,
  winRate: 0,
  overdueFollowUps: 0,
  byStage: [],
};

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const compactCurrency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 0 });
const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function initialFilters(): Filters {
  if (typeof window === "undefined") {
    return { search: "", stage: "", source: "", owner: "", sort: "nextAction", direction: "asc", page: 1, pageSize: 10 };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get("search") ?? "",
    stage: params.get("stage") ?? "",
    source: params.get("source") ?? "",
    owner: params.get("owner") ?? "",
    sort: params.get("sort") ?? "nextAction",
    direction: params.get("direction") ?? "asc",
    page: Math.max(1, Number(params.get("page") ?? 1)),
    pageSize: 10,
  };
}

export function ClientOpsDashboard() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [data, setData] = useState<ApiResponse>({ items: [], total: 0, page: 1, totalPages: 1 });
  const [metrics, setMetrics] = useState<Metrics>(emptyMetrics);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const params = useMemo(() => {
    const next = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && !(key === "page" && value === 1) && key !== "pageSize") next.set(key, String(value));
    });
    next.set("pageSize", String(filters.pageSize));
    return next;
  }, [filters]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [leadResponse, metricResponse] = await Promise.all([
        fetch(`/api/leads?${params.toString()}`),
        fetch("/api/metrics"),
      ]);
      if (!leadResponse.ok || !metricResponse.ok) throw new Error("The dashboard data could not be loaded.");
      setData(await leadResponse.json());
      setMetrics(await metricResponse.json());
      const visibleParams = new URLSearchParams(params);
      visibleParams.delete("pageSize");
      window.history.replaceState(null, "", visibleParams.size ? `?${visibleParams}` : window.location.pathname);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    const timer = window.setTimeout(load, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  function update<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((current) => ({ ...current, [key]: value, page: key === "page" ? Number(value) : 1 }));
  }

  function reset() {
    setFilters({ search: "", stage: "", source: "", owner: "", sort: "nextAction", direction: "asc", page: 1, pageSize: 10 });
  }

  const activeFilters = [filters.search, filters.stage, filters.source, filters.owner].filter(Boolean).length;
  const maxStage = Math.max(1, ...metrics.byStage.map((item) => item.count));

  return (
    <div className="dashboard-shell">
      <header className="app-header">
        <div>
          <Link className="app-brand" href="/"><span>CO</span><strong>ClientOps</strong></Link>
          <p>Sales pipeline workspace</p>
        </div>
        <div className="demo-badge"><span /> DEMO DATA</div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-title">
          <div><p className="overline">OVERVIEW · JULY 2026</p><h1>Pipeline command center</h1><p>Track momentum, surface follow-ups, and keep every lead moving.</p></div>
          <a className="export-button" href={`/api/leads/export.csv?${params.toString()}`} download>Export filtered CSV <span>↓</span></a>
        </div>

        <section className="kpi-grid" aria-label="Pipeline metrics">
          {[
            ["Pipeline value", compactCurrency.format(metrics.pipelineValue), "Active opportunities"],
            ["Active leads", String(metrics.activeLeads), "New through proposal"],
            ["Win rate", `${metrics.winRate}%`, "Won vs. closed"],
            ["Overdue follow-ups", String(metrics.overdueFollowUps), "Needs attention"],
          ].map(([label, value, note], index) => (
            <article className={index === 3 ? "kpi attention" : "kpi"} key={label}>
              <div><span>{label}</span><i aria-hidden>{index === 0 ? "$" : index === 1 ? "↗" : index === 2 ? "%" : "!"}</i></div>
              <strong>{loading ? "—" : value}</strong><small>{note}</small>
            </article>
          ))}
        </section>

        <div className="dashboard-layout">
          <section className="pipeline-panel">
            <div className="panel-heading"><div><p className="overline">PIPELINE HEALTH</p><h2>Stage distribution</h2></div><span>{metrics.activeLeads} active</span></div>
            <div className="stage-bars">
              {metrics.byStage.map((item) => (
                <div className="stage-row" key={item.stage}>
                  <div><span className={`stage-dot stage-${item.stage}`} /><strong>{item.stage}</strong></div>
                  <div className="track"><i className={`fill stage-${item.stage}`} style={{ width: `${(item.count / maxStage) * 100}%` }} /></div>
                  <b>{item.count}</b>
                  <span>{compactCurrency.format(item.value)}</span>
                </div>
              ))}
            </div>
          </section>

          <aside className="focus-panel">
            <p className="overline">TODAY&apos;S FOCUS</p>
            <strong>{metrics.overdueFollowUps}</strong>
            <h2>follow-ups are overdue</h2>
            <p>Start with proposals, then qualified leads with the highest potential value.</p>
            <button onClick={() => update("sort", "value")}>Prioritize by value →</button>
          </aside>
        </div>

        <section className="leads-panel">
          <div className="leads-heading">
            <div><p className="overline">LEAD WORKSPACE</p><h2>All opportunities</h2></div>
            <p>{data.total} results{activeFilters ? ` · ${activeFilters} active filter${activeFilters === 1 ? "" : "s"}` : ""}</p>
          </div>

          <div className="filter-bar">
            <label className="search-field"><span className="sr-only">Search companies or contacts</span><i aria-hidden>⌕</i><input value={filters.search} onChange={(event) => update("search", event.target.value)} placeholder="Search company or contact…" /></label>
            <label><span className="sr-only">Stage</span><select value={filters.stage} onChange={(event) => update("stage", event.target.value)}><option value="">All stages</option>{STAGES.map((stage) => <option key={stage} value={stage}>{stage[0].toUpperCase() + stage.slice(1)}</option>)}</select></label>
            <label><span className="sr-only">Source</span><select value={filters.source} onChange={(event) => update("source", event.target.value)}><option value="">All sources</option>{SOURCES.map((source) => <option key={source}>{source}</option>)}</select></label>
            <label><span className="sr-only">Owner</span><select value={filters.owner} onChange={(event) => update("owner", event.target.value)}><option value="">All owners</option>{OWNERS.map((owner) => <option key={owner}>{owner}</option>)}</select></label>
            {activeFilters > 0 && <button className="clear-button" onClick={reset}>Clear</button>}
          </div>

          <div className="sort-row">
            <span>Sort by</span>
            <select value={filters.sort} onChange={(event) => update("sort", event.target.value)}>
              <option value="nextAction">Next action</option><option value="value">Deal value</option><option value="lastContact">Last contact</option><option value="company">Company</option>
            </select>
            <button aria-label={`Sort ${filters.direction === "asc" ? "descending" : "ascending"}`} onClick={() => update("direction", filters.direction === "asc" ? "desc" : "asc")}>{filters.direction === "asc" ? "↑" : "↓"}</button>
          </div>

          {error ? (
            <div className="state-card"><strong>We hit a snag.</strong><p>{error}</p><button onClick={load}>Try again</button></div>
          ) : loading ? (
            <div className="loading-list" aria-live="polite" aria-label="Loading leads">{Array.from({ length: 5 }, (_, i) => <i key={i} />)}</div>
          ) : data.items.length === 0 ? (
            <div className="state-card"><strong>No leads match these filters.</strong><p>Try a broader search or clear the current filters.</p><button onClick={reset}>Clear filters</button></div>
          ) : (
            <>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Company</th><th>Stage</th><th>Value</th><th>Owner</th><th>Last contact</th><th>Next action</th><th><span className="sr-only">Open</span></th></tr></thead>
                  <tbody>{data.items.map((lead) => (
                    <tr key={lead.id}>
                      <td><button className="company-button" onClick={() => setSelected(lead)}><span>{lead.company.slice(0, 2).toUpperCase()}</span><div><strong>{lead.company}</strong><small>{lead.contact}</small></div></button></td>
                      <td><span className={`stage-pill stage-${lead.stage}`}>{lead.stage}</span></td>
                      <td><strong>{currency.format(lead.value)}</strong></td>
                      <td>{lead.owner}</td><td>{dateFormat.format(new Date(`${lead.lastContact}T00:00:00Z`))}</td>
                      <td><strong>{lead.nextAction}</strong><small className={lead.nextActionDate < "2026-07-23" && !["won", "lost"].includes(lead.stage) ? "overdue" : ""}>{dateFormat.format(new Date(`${lead.nextActionDate}T00:00:00Z`))}</small></td>
                      <td><button className="row-open" onClick={() => setSelected(lead)} aria-label={`Open ${lead.company}`}>→</button></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
              <div className="mobile-lead-list">{data.items.map((lead) => (
                <button className="mobile-lead-card" key={lead.id} onClick={() => setSelected(lead)}>
                  <div><span className={`stage-pill stage-${lead.stage}`}>{lead.stage}</span><strong>{currency.format(lead.value)}</strong></div>
                  <h3>{lead.company}</h3><p>{lead.contact} · {lead.owner}</p><small>{lead.nextAction} · {dateFormat.format(new Date(`${lead.nextActionDate}T00:00:00Z`))}</small>
                </button>
              ))}</div>
              <div className="pagination">
                <p>Page {data.page} of {data.totalPages}</p>
                <div><button disabled={data.page <= 1} onClick={() => update("page", data.page - 1)}>← Previous</button><button disabled={data.page >= data.totalPages} onClick={() => update("page", data.page + 1)}>Next →</button></div>
              </div>
            </>
          )}
        </section>
      </main>

      {selected && <div className="drawer-layer" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setSelected(null); }}>
        <aside className="lead-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
          <div className="drawer-top"><span className={`stage-pill stage-${selected.stage}`}>{selected.stage}</span><button onClick={() => setSelected(null)} aria-label="Close lead details">×</button></div>
          <p className="overline">LEAD #{String(selected.id).padStart(3, "0")}</p><h2 id="drawer-title">{selected.company}</h2><p>{selected.contact}</p>
          <div className="drawer-value"><span>Potential value</span><strong>{currency.format(selected.value)}</strong></div>
          <dl>
            <div><dt>Owner</dt><dd>{selected.owner}</dd></div><div><dt>Source</dt><dd>{selected.source}</dd></div>
            <div><dt>Last contact</dt><dd>{dateFormat.format(new Date(`${selected.lastContact}T00:00:00Z`))}</dd></div>
            <div><dt>Next action</dt><dd>{selected.nextAction}<small>{dateFormat.format(new Date(`${selected.nextActionDate}T00:00:00Z`))}</small></dd></div>
          </dl>
          <div className="drawer-note"><span>DATA NOTE</span><p>{selected.notes}</p></div>
        </aside>
      </div>}
    </div>
  );
}
