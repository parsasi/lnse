import { eq } from "drizzle-orm";
import { db } from "@db/db.server";
import { entities } from "@db/schema.server";

function getBaseSelect() {
  return db.select().from(entities);
}

export async function findEntityById(id: (typeof entities.$inferSelect)["id"]) {
  return getBaseSelect().where(eq(entities.id, id)).limit(1);
}

export async function createEntity(newEntity: typeof entities.$inferInsert) {
  return await db.insert(entities).values(newEntity).returning();
}

export async function updateEntity(
  id: (typeof entities.$inferSelect)["id"],
  newEntity: Partial<typeof entities.$inferSelect>,
) {
  return await db.update(entities).set(newEntity).where(eq(entities.id, id)).returning();
}
