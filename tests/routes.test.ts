import assert from "node:assert/strict";
import test from "node:test";
import { createCsvResponse, createLeadsResponse, createMetricsResponse } from "../lib/api";
import { createDemoLeads } from "../lib/leads";

const leads = createDemoLeads();

test("leads endpoint response is paginated and filtered", async () => {
  const response = createLeadsResponse(new Request("http://localhost/api/leads?stage=proposal&pageSize=3"), leads);
  assert.equal(response.status, 200);
  const body = await response.json() as { items: { stage: string }[]; total: number };
  assert.equal(body.items.length, 3);
  assert.ok(body.items.every((lead) => lead.stage === "proposal"));
  assert.ok(body.total >= 3);
});

test("leads endpoint response rejects invalid parameters", async () => {
  const response = createLeadsResponse(new Request("http://localhost/api/leads?page=zero"), leads);
  assert.equal(response.status, 400);
  assert.match((await response.json() as { error: string }).error, /positive integer/);
});

test("leads endpoint response handles empty results", async () => {
  const response = createLeadsResponse(new Request("http://localhost/api/leads?search=definitely-not-a-company"), leads);
  const body = await response.json() as { items: unknown[]; total: number };
  assert.equal(response.status, 200);
  assert.deepEqual(body.items, []);
  assert.equal(body.total, 0);
});

test("metrics endpoint response contains each KPI", async () => {
  const response = createMetricsResponse(leads);
  const body = await response.json() as Record<string, unknown>;
  assert.equal(response.status, 200);
  for (const key of ["pipelineValue", "activeLeads", "winRate", "overdueFollowUps", "byStage"]) {
    assert.ok(key in body);
  }
});

test("CSV endpoint response follows active filters", async () => {
  const response = createCsvResponse(new Request("http://localhost/api/leads/export.csv?stage=won"), leads);
  const csv = await response.text();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /text\/csv/);
  assert.ok(csv.split("\r\n").slice(1).every((row) => row.includes(",won,")));
});
