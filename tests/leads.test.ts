import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateMetrics,
  createDemoLeads,
  csvEscape,
  filterAndSortLeads,
  leadsToCsv,
  paginateLeads,
  parseLeadQuery,
} from "../lib/leads";

test("parses supported query parameters", () => {
  const query = parseLeadQuery(new URLSearchParams("stage=proposal&sort=value&direction=desc&page=2&pageSize=5"));
  assert.equal(query.stage, "proposal");
  assert.equal(query.sort, "value");
  assert.equal(query.page, 2);
  assert.equal(query.pageSize, 5);
});

test("rejects invalid and unknown query parameters", () => {
  assert.throws(() => parseLeadQuery(new URLSearchParams("stage=maybe")), /Invalid stage/);
  assert.throws(() => parseLeadQuery(new URLSearchParams("pageSize=100")), /between 1 and 50/);
  assert.throws(() => parseLeadQuery(new URLSearchParams("secret=true")), /Unsupported/);
});

test("filters, sorts, and paginates deterministically", () => {
  const query = parseLeadQuery(new URLSearchParams("stage=proposal&sort=value&direction=desc&pageSize=4"));
  const filtered = filterAndSortLeads(createDemoLeads(), query);
  assert.ok(filtered.every((lead) => lead.stage === "proposal"));
  assert.ok(filtered[0].value >= filtered[1].value);
  const page = paginateLeads(filtered, query);
  assert.equal(page.items.length, 4);
  assert.equal(page.page, 1);
  assert.ok(page.total > 4);
});

test("calculates pipeline metrics from lead state", () => {
  const metrics = calculateMetrics(createDemoLeads(10));
  assert.equal(metrics.activeLeads, 6);
  assert.equal(metrics.winRate, 50);
  assert.equal(metrics.byStage.reduce((sum, item) => sum + item.count, 0), 10);
  assert.ok(metrics.pipelineValue > 0);
});

test("escapes CSV cells safely", () => {
  assert.equal(csvEscape("Plain"), "Plain");
  assert.equal(csvEscape('Quoted "name", Inc.'), '"Quoted ""name"", Inc."');
  const csv = leadsToCsv([{ ...createDemoLeads(1)[0], company: "Comma, Company" }]);
  assert.match(csv, /"Comma, Company"/);
  assert.equal(csv.split("\r\n").length, 2);
});
