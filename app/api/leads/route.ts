import { loadLeads } from "@/lib/data";
import { createLeadsResponse } from "@/lib/api";

export async function GET(request: Request) {
  try {
    return createLeadsResponse(request, await loadLeads());
  } catch {
    return Response.json({ error: "The leads could not be loaded." }, { status: 500 });
  }
}
