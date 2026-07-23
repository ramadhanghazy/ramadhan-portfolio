import {
  calculateMetrics,
  filterAndSortLeads,
  leadsToCsv,
  paginateLeads,
  parseLeadQuery,
  type Lead,
} from "@/lib/leads";

function isValidationError(error: unknown) {
  return error instanceof Error && (
    error.message.startsWith("Invalid") ||
    error.message.startsWith("Unsupported") ||
    error.message.startsWith("Page") ||
    error.message.startsWith("pageSize")
  );
}

export function createLeadsResponse(request: Request, leads: Lead[]) {
  try {
    const query = parseLeadQuery(new URL(request.url).searchParams);
    return Response.json(paginateLeads(filterAndSortLeads(leads, query), query));
  } catch (error) {
    if (isValidationError(error)) return Response.json({ error: (error as Error).message }, { status: 400 });
    return Response.json({ error: "The leads could not be loaded." }, { status: 500 });
  }
}

export function createMetricsResponse(leads: Lead[]) {
  return Response.json(calculateMetrics(leads));
}

export function createCsvResponse(request: Request, leads: Lead[]) {
  try {
    const params = new URL(request.url).searchParams;
    params.delete("page");
    params.delete("pageSize");
    const query = parseLeadQuery(params);
    const csv = leadsToCsv(filterAndSortLeads(leads, query));
    return new Response(csv, {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": 'attachment; filename="clientops-leads.csv"',
      },
    });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Invalid export request." }, { status: 400 });
  }
}
