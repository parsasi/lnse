import { json, useFetcher, type MetaFunction } from "@remix-run/react";
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
import { uploadStreamToS3 } from "@utils/aws.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  return json({});
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const uploadHandler = composeUploadHandlers(
    uploadStreamToS3,
    createMemoryUploadHandler()
  );

  const formData = await parseMultipartFormData(request, uploadHandler);
  console.log(formData);
  const log = formData.get("log");
  const imgDesc = formData.get("desc");

  return json({ log, imgDesc });
};

export default function Index() {
  const fetcher = useFetcher();
  //   const { presignedUrl } = useLoaderData<typeof loader>();

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="mx-2 border-0 md:border-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Explore a log file</CardTitle>
          <CardDescription>
            Upload a log file or explore one of our examples
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" className="text-start">
              <Icons.airCanada className="w-6 h-6 mr-2" />
              Air Canada
            </Button>
            <Button variant="outline" className="text-start">
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
            <fetcher.Form method="post" encType="multipart/form-data">
              <div className="grid items-center w-full max-w-sm gap-4">
                <Label htmlFor="log">AirShoppingRS XML</Label>
                <Input
                  id="log"
                  name="log"
                  type="file"
                  className="border-dashed pt-[50px] pb-[70px]"
                />
              </div>
              <Button type="submit">Upload to S3</Button>
            </fetcher.Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
