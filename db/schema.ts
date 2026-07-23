import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey(),
  company: text("company").notNull(),
  contact: text("contact").notNull(),
  stage: text("stage").notNull(),
  source: text("source").notNull(),
  owner: text("owner").notNull(),
  value: real("value").notNull(),
  lastContact: text("last_contact").notNull(),
  nextAction: text("next_action").notNull(),
  nextActionDate: text("next_action_date").notNull(),
  notes: text("notes").notNull(),
});
