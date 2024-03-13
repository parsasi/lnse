import { eventStream } from "@utils/event-stream.server";
import { findSessionById } from "@modules/session/session.server";
import { invariant } from "@utils/invariant";
import { SessionStatus } from "@db/schema.server";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const REFRESH_INTERVAL = 500;
export const EVENT_NAME = "session-status";

export function getRoute(routeParams: { session: string }) {
  return `/${routeParams.session}/status`;
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.session, "Invalid Session");
  const session = await findSessionById(params.session);
  const sessionId = session?.[0]?.id;
  invariant(sessionId, "Invalid Session");

  return eventStream(
    request.signal,
    function setup(send: (data: { event: string; data: any }) => void) {
      let timer = setInterval(async () => {
        const sessionLocal = await findSessionById(params.session!);
        const sessionStatus = sessionLocal?.[0]?.status;
        if (!sessionStatus) {
          send({ event: EVENT_NAME, data: JSON.stringify({ error: "Session not found" }) });
        } else if (sessionStatus === SessionStatus.ready) {
          send({ event: EVENT_NAME, data: JSON.stringify({ status: sessionStatus }) });
        } else {
          send({
            event: EVENT_NAME,
            data: JSON.stringify({
              status: sessionStatus,
            }),
          });
        }
      }, REFRESH_INTERVAL);

      return function clear() {
        clearInterval(timer);
      };
    }
  );
}
