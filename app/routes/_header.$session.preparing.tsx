import { json, type MetaFunction, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { MovingBorder } from "@components/ui/moving-border";
import { findSessionById } from "@modules/session/session.server";
import { getRoute as getSessionRoute } from "./_header.$session._index";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { getRequestUrl } from "@utils/url";
import { invariant } from "@utils/invariant";
import { copy } from "@utils/copy";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function getRoute(routeParams: { session: string }) {
  return `/${routeParams.session}/preparing`;
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  invariant(params.session, "Invalid Session");
  const session = await findSessionById(params.session);
  const sessionId = session?.[0]?.id;
  invariant(sessionId, "Invalid Session");
  const sessionPath = getSessionRoute({ session: sessionId });
  const host = request.headers.get("host");
  invariant(host, "Invalid Host");
  const sessionRoute = getRequestUrl(host, sessionPath);
  return json({ session: session[0], sessionRoute });
}

export default function Index() {
  const { session, sessionRoute } = useLoaderData<typeof loader>();

  const copyAndNotify = async (text: string) => {
    copy(text)
      .then(() => {
        //TODO: notify using sooner notifications
      })
      .catch(() => {
        //TODO: notify using sooner the fact that it failed
      });
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <MovingBorder
        as={Card}
        className="mx-2 border-none"
        duration={3000}
        borderRadius="1rem"
      >
        <CardHeader className="space-y-1 bg-transparent">
          <CardTitle className="text-2xl">Getting Things Ready</CardTitle>
          <CardDescription>
            Share this link with other collaborators.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 bg-transparent">
          <div className="flex space-x-2">
            <Input value={sessionRoute} readOnly />
            <Button
              variant="secondary"
              className="shrink-0"
              onClick={() => copyAndNotify(sessionRoute)}
            >
              Copy Link
            </Button>
          </div>
        </CardContent>
      </MovingBorder>
    </div>
  );
}
