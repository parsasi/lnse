import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { Queue } from "sst/node/queue";

export async function sendMessage<TData>(message: TData) {
  const sqs = new SQSClient({});
  const command = new SendMessageCommand({
    QueueUrl: Queue["processQueue"].queueUrl,
    MessageBody: JSON.stringify(message),
  });

  return await sqs.send(command);
}
