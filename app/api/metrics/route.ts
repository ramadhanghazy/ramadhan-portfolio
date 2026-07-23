import { loadLeads } from "@/lib/data";
import { createMetricsResponse } from "@/lib/api";

export async function GET() {
  try {
    return createMetricsResponse(await loadLeads());
  } catch {
    return Response.json({ error: "The metrics could not be loaded." }, { status: 500 });
  }
}
