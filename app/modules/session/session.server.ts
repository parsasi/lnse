import { eq } from 'drizzle-orm';
import { db } from '@db/db.server'
import { sessions } from '@db/schema.server'

function getBaseSelect(){
    return db.select().from(sessions);
}

export async function findSessionById(id: typeof sessions.$inferSelect['id']){
    return getBaseSelect().where(eq(sessions.id , id)).limit(1);
}

export async function createSession(newSession : typeof sessions.$inferInsert){
    return await db.insert(sessions).values(newSession).returning();
}