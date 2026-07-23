import { getDb } from "@/db";
import { leads as leadsTable } from "@/db/schema";
import { createDemoLeads, type Lead } from "@/lib/leads";

export async function loadLeads(): Promise<Lead[]> {
  try {
    const rows = await getDb().select().from(leadsTable);
    if (!rows.length) return createDemoLeads();
    return rows as Lead[];
  } catch {
    return createDemoLeads();
  }
}
