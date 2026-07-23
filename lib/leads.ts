export const STAGES = ["new", "qualified", "proposal", "won", "lost"] as const;
export const SOURCES = ["Referral", "Website", "LinkedIn", "Partner"] as const;
export const OWNERS = ["Maya Chen", "Theo Grant", "Nina Patel"] as const;

export type Stage = (typeof STAGES)[number];

export type Lead = {
  id: number;
  company: string;
  contact: string;
  stage: Stage;
  source: string;
  owner: string;
  value: number;
  lastContact: string;
  nextAction: string;
  nextActionDate: string;
  notes: string;
};

export type LeadQuery = {
  search: string;
  stage: "" | Stage;
  source: string;
  owner: string;
  sort: "company" | "value" | "lastContact" | "nextAction";
  direction: "asc" | "desc";
  page: number;
  pageSize: number;
};

const companyRoots = [
  "Northstar", "Copper & Co.", "Brightline", "Morrow", "Fieldnote",
  "Harbor", "Cedar Works", "Juniper", "Paper Kite", "Goodwell",
  "Willow Labs", "Clearpath", "Bluebird", "Common Thread", "Daybreak",
];
const companyTypes = ["Studio", "Foods", "Advisory", "Supply", "Digital"];
const firstNames = ["Avery", "Jordan", "Casey", "Morgan", "Riley", "Taylor", "Cameron", "Reese"];
const lastNames = ["Brooks", "Kim", "Singh", "Miller", "Rivera", "Bell", "Foster", "Young"];
const actions = ["Discovery call", "Send proposal", "Review scope", "Follow up", "Share estimate", "Contract review"];

export function createDemoLeads(count = 60): Lead[] {
  return Array.from({ length: count }, (_, index) => {
    const id = index + 1;
    const stage = STAGES[index % STAGES.length];
    const daysAgo = (index * 3) % 32;
    const daysAhead = (index % 13) - 5;
    const date = new Date("2026-07-23T00:00:00Z");
    date.setUTCDate(date.getUTCDate() - daysAgo);
    const nextDate = new Date("2026-07-23T00:00:00Z");
    nextDate.setUTCDate(nextDate.getUTCDate() + daysAhead);
    return {
      id,
      company: `${companyRoots[index % companyRoots.length]} ${companyTypes[Math.floor(index / companyRoots.length) % companyTypes.length]}`,
      contact: `${firstNames[index % firstNames.length]} ${lastNames[(index * 3) % lastNames.length]}`,
      stage,
      source: SOURCES[index % SOURCES.length],
      owner: OWNERS[index % OWNERS.length],
      value: 2400 + ((index * 1375) % 28600),
      lastContact: date.toISOString().slice(0, 10),
      nextAction: actions[index % actions.length],
      nextActionDate: nextDate.toISOString().slice(0, 10),
      notes: "Synthetic demonstration record. No real customer or personal data is used.",
    };
  });
}

const allowedKeys = new Set(["search", "stage", "source", "owner", "sort", "direction", "page", "pageSize"]);

export function parseLeadQuery(params: URLSearchParams): LeadQuery {
  for (const key of params.keys()) {
    if (!allowedKeys.has(key)) throw new Error(`Unsupported query parameter: ${key}`);
  }
  const stage = params.get("stage") ?? "";
  const source = params.get("source") ?? "";
  const owner = params.get("owner") ?? "";
  const sort = params.get("sort") ?? "nextAction";
  const direction = params.get("direction") ?? "asc";
  const page = Number(params.get("page") ?? "1");
  const pageSize = Number(params.get("pageSize") ?? "10");

  if (stage && !STAGES.includes(stage as Stage)) throw new Error("Invalid stage");
  if (source && !SOURCES.includes(source as (typeof SOURCES)[number])) throw new Error("Invalid source");
  if (owner && !OWNERS.includes(owner as (typeof OWNERS)[number])) throw new Error("Invalid owner");
  if (!["company", "value", "lastContact", "nextAction"].includes(sort)) throw new Error("Invalid sort");
  if (!["asc", "desc"].includes(direction)) throw new Error("Invalid direction");
  if (!Number.isInteger(page) || page < 1) throw new Error("Page must be a positive integer");
  if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 50) throw new Error("pageSize must be between 1 and 50");

  return {
    search: (params.get("search") ?? "").trim().slice(0, 80),
    stage: stage as LeadQuery["stage"],
    source,
    owner,
    sort: sort as LeadQuery["sort"],
    direction: direction as LeadQuery["direction"],
    page,
    pageSize,
  };
}

export function filterAndSortLeads(leads: Lead[], query: LeadQuery) {
  const term = query.search.toLowerCase();
  const filtered = leads.filter((lead) => {
    const matchesSearch = !term || `${lead.company} ${lead.contact}`.toLowerCase().includes(term);
    return matchesSearch &&
      (!query.stage || lead.stage === query.stage) &&
      (!query.source || lead.source === query.source) &&
      (!query.owner || lead.owner === query.owner);
  });

  const keyMap = {
    company: "company",
    value: "value",
    lastContact: "lastContact",
    nextAction: "nextActionDate",
  } as const;
  const key = keyMap[query.sort];
  filtered.sort((a, b) => {
    const left = a[key];
    const right = b[key];
    const result = typeof left === "number"
      ? left - (right as number)
      : String(left).localeCompare(String(right));
    return query.direction === "asc" ? result : -result;
  });
  return filtered;
}

export function paginateLeads(leads: Lead[], query: LeadQuery) {
  const total = leads.length;
  const totalPages = Math.max(1, Math.ceil(total / query.pageSize));
  const page = Math.min(query.page, totalPages);
  const start = (page - 1) * query.pageSize;
  return { items: leads.slice(start, start + query.pageSize), total, page, totalPages };
}

export function calculateMetrics(leads: Lead[], today = "2026-07-23") {
  const active = leads.filter((lead) => !["won", "lost"].includes(lead.stage));
  const decided = leads.filter((lead) => ["won", "lost"].includes(lead.stage));
  return {
    pipelineValue: active.reduce((sum, lead) => sum + lead.value, 0),
    activeLeads: active.length,
    winRate: decided.length ? Math.round((leads.filter((lead) => lead.stage === "won").length / decided.length) * 100) : 0,
    overdueFollowUps: active.filter((lead) => lead.nextActionDate < today).length,
    byStage: STAGES.map((stage) => ({
      stage,
      count: leads.filter((lead) => lead.stage === stage).length,
      value: leads.filter((lead) => lead.stage === stage).reduce((sum, lead) => sum + lead.value, 0),
    })),
  };
}

export function csvEscape(value: string | number) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function leadsToCsv(leads: Lead[]) {
  const headers = ["Company", "Contact", "Stage", "Source", "Owner", "Value", "Last contact", "Next action", "Next action date"];
  const rows = leads.map((lead) => [
    lead.company, lead.contact, lead.stage, lead.source, lead.owner, lead.value,
    lead.lastContact, lead.nextAction, lead.nextActionDate,
  ].map(csvEscape).join(","));
  return [headers.join(","), ...rows].join("\r\n");
}
