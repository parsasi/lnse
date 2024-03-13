import { SQSEvent } from "aws-lambda";
import { updateSession } from "@modules/session/session.server";
import { SessionStatus } from "@db/schema.server";

export type HandlerBody = {
  sessionId: string;
};

export async function main(event: SQSEvent) {
  const payload = JSON.parse(event.Records[0].body) as HandlerBody;
  setTimeout(() => {
    updateSession(payload.sessionId, { status: SessionStatus.ready });
  }, 10000);
}
