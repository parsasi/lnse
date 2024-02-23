import { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.server.ts",
  out: "./db/migrations",
  driver: "turso",
  dbCredentials: {
    url: 'file:./local.db',
  }
} satisfies Config;