import { createMetricsResponse } from "../../lib/api";
import { createDemoLeads } from "../../lib/leads";

export function onRequestGet() {
  return createMetricsResponse(createDemoLeads());
}
