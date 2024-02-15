import {
    json,
    type MetaFunction,
    useLoaderData,
} from "@remix-run/react";
import {
    LoaderFunctionArgs,
} from "@remix-run/node";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@components/ui/card";  
import {  findSessionById } from "../modules/session/session.server";
import { invariant } from "../utils/invariant";

  export const meta: MetaFunction = () => {
    return [
      { title: "New Remix App" },
      { name: "description", content: "Welcome to Remix!" },
    ];
  };
  
  export async function loader({ params } : LoaderFunctionArgs) {
    invariant(params.session , "Invalid Session");
    const session = await findSessionById(params.session);
    invariant(session?.[0] , "Invalid Session");
    return json({ session: session[0]});
  }

  export default function Index() {

    const {session} = useLoaderData<typeof loader>()
  
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Card className="mx-2 border-0 md:border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">We are sorting things out</CardTitle>
            <CardDescription>
              Please hang tights
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            {session.id}
          </CardContent>
        </Card>
      </div>
    );
  }
  