import { createLeadsResponse } from "../../lib/api";
import { createDemoLeads } from "../../lib/leads";

type Context = { request: Request };

export function onRequestGet({ request }: Context) {
  return createLeadsResponse(request, createDemoLeads());
}
