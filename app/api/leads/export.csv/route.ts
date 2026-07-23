import { loadLeads } from "@/lib/data";
import { createCsvResponse } from "@/lib/api";

export async function GET(request: Request) {
  try {
    return createCsvResponse(request, await loadLeads());
  } catch {
    return Response.json({ error: "The export could not be created." }, { status: 500 });
  }
}
