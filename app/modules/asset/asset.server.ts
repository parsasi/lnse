import { eq } from "drizzle-orm";
import { db } from "@db/db.server";
import { assets } from "@db/schema.server";

function getBaseSelect() {
  return db.select().from(assets);
}

export async function getAssetsBySession(session: string) {
  return getBaseSelect().where(eq(assets.session, session));
}

export async function findAsset(id: (typeof assets)["id"]) {
  return getBaseSelect().where(eq(assets.id, id));
}

export async function createAsset(newSession: typeof assets.$inferInsert) {
  return await db.insert(assets).values(newSession).returning();
}
