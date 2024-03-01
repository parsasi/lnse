import { SQSEvent } from "aws-lambda";
import {} from "@modules/session/session.server";

export async function main(event: SQSEvent) {
  console.log("event", event);
  setTimeout(() => {
    console.log("done");
  }, 3000);
}
