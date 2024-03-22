import { SQSEvent } from "aws-lambda";
import { updateSession } from "@modules/session/session.server";
import { SessionStatus } from "@db/schema.server";
import { getStorifiedData } from "~/utils/tinybase";
import { createEntity, updateEntity } from "~/modules/entity/entity.server";

export type HandlerBody = {
  sessionId: string;
  assetId: string;
};

export async function main(event: SQSEvent) {
  // const payload = JSON.parse(event.Records[0].body) as HandlerBody;
  // await createEntity({
  //   session: payload.sessionId,
  //   type: "Offer",
  //   identifier: "1",
  //   asset: payload.assetId,
  //   data: store,
  // });
}
