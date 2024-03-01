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
  createdAt: integer("createdAt", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  status: text("status").$default(() => SessionStatus.initializing),
});

export const assets = sqliteTable("assets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  createdAt: integer("createdAt", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  path: text("path").notNull(),
  session: text("session").references(() => sessions.id, {
    onDelete: "cascade",
  }),
});
