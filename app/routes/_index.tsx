import { Button } from "@components/ui/button";
import { ThemeSwitch } from "@components/patterns/theme-switch";
import type { MetaFunction } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { type Theme } from "~/utils/theme.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { userPreferences } = useOutletContext<{
    userPreferences: { theme?: Theme };
  }>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Button>Click Me</Button>
      <ThemeSwitch userPreference={userPreferences.theme} />
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
