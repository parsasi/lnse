import { Icons } from "@components/ui/icons";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { type MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function index() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card>
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
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background text-muted-foreground">
                Or Upload Your Own
              </span>
            </div>
          </div>
          <div className="grid gap-2 mt-2">
            <div className="grid items-center w-full max-w-sm gap-4">
              <Label htmlFor="logFile">AirShoppingRS XML</Label>
              <Input
                id="logFile"
                type="file"
                className="border-dashed pt-[50px] pb-[70px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
