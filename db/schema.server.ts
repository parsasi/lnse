import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { randomUUID } from "crypto";

export const SessionStatus = {
  initializing: "initializing",
  processing: "processing",
  ready: "ready",
  error: "error",
} as const;

export const sessions = sqliteTable("sessions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  createdAt: integer("createdAt", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).$defaultFn(() => new Date()),
  status: text("status").$default(() => SessionStatus.initializing),
});

export const assets = sqliteTable("assets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  createdAt: integer("createdAt", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).$defaultFn(() => new Date()),
  path: text("path").notNull(),
  session: text("session").references(() => sessions.id, {
    onDelete: "cascade",
  }),
});

export const entities = sqliteTable("entities", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  createdAt: integer("createdAt", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).$defaultFn(() => new Date()),
  session: text("session").references(() => sessions.id, {
    onDelete: "cascade",
  }),
  asset: text("asset").references(() => assets.id, {
    onDelete: "cascade",
  }),
  type: text("type").notNull(),
  identifier: text("identifier").notNull().unique(),
  data: text("data", { mode: "json" }),
});

export const attributes = sqliteTable("attributes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  createdAt: integer("createdAt", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).$defaultFn(() => new Date()),
  entity: text("entity").references(() => entities.id, {
    onDelete: "cascade",
  }),
  key: text("key").notNull(),
  value: text("value").notNull(),
});

export const relationships = sqliteTable("relationships", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  createdAt: integer("createdAt", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).$defaultFn(() => new Date()),
  from: text("from").references(() => entities.id, {
    onDelete: "cascade",
  }),
  to: text("to").references(() => entities.id, {
    onDelete: "cascade",
  }),
});
