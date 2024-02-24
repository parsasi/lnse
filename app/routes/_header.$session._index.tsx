import {
    type MetaFunction,
} from "@remix-run/react";
import {
    LoaderFunctionArgs, json,
} from "@remix-run/node";


  export const meta: MetaFunction = () => {
    return [
      { title: "New Remix App" },
      { name: "description", content: "Welcome to Remix!" },
    ];
  };
  

export function getRoute(routeParams: {session : string}){
  return `/${routeParams.session}`
}

export async function loader({ params } : LoaderFunctionArgs) {
    return json({})
}

export default function Index() {
    return (
        <div className="flex items-center justify-center w-full h-screen">
        newSession
        </div>
    );
    
}
  