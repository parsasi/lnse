import {
  json,
  useFetcher,
  type MetaFunction,
} from "@remix-run/react";
import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
  ActionFunctionArgs,
} from "@remix-run/node";
import { Icons } from "@components/ui/icons";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Skeleton } from "@components/ui/skeleton";
import { createSession } from "@modules/session/session.server";
import { createAsset } from "@modules/asset/asset.server";
import { uploadStreamToS3 } from "@utils/aws.server";
import { findFormParent } from "@utils/dom.client";
import { invariantResponse } from "@utils/invariant";
import { reportError } from "@utils/reportError.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  //TODO: validate the given file.
  const uploadHandler = composeUploadHandlers(
    uploadStreamToS3,
    createMemoryUploadHandler()
  );

  const formData = await parseMultipartFormData(request, uploadHandler);
  const log = formData.get("log");

  invariantResponse(log , 'Could not upload the file.')

  //TODO: validate the returned log.

  try{
    const session = await createSession({});
    await createAsset({
      path: log.toString(),
      session: session[0]?.id
    });

    json({
      session
    });

  }catch(e){
   reportError(e , 'error');
  }
};

export default function Index() {
  const fetcher = useFetcher({
    key: "upload-log",
  });

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    fetcher.submit(findFormParent(e.target));
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="mx-2 border-0 md:border-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Explore a log file</CardTitle>
          <CardDescription>
            Upload a AirShoppingRS response or explore one of our examples
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="grid grid-cols-1 gap-4">
            <Button
              variant="outline"
              className="text-start"
              disabled={fetcher.state !== "idle"}
            >
              <Icons.airCanada className="w-6 h-6 mr-2" />
              Air Canada
            </Button>
            <Button
              variant="outline"
              className="text-start"
              disabled={fetcher.state !== "idle"}
            >
              <Icons.americanAirline className="w-6 h-6 mr-2" />
              American Airlines
            </Button>
          </div>
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background text-muted-foreground">
                Or Upload Your Own
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            {fetcher.state === "submitting" ? (
              <Skeleton className={`w-full h-[152px] rounded`} />
            ) : (
              <fetcher.Form method="post" encType="multipart/form-data">
                <div className="grid items-center w-full gap-4">
                  <Label htmlFor="log">AirShoppingRS XML</Label>
                  <Input
                    id="log"
                    name="log"
                    type="file"
                    className="border-dashed pt-[50px] pb-[70px]"
                    onChange={fileChangeHandler}
                  />
                </div>
              </fetcher.Form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
