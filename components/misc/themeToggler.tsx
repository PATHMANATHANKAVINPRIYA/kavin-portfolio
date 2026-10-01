"use client";

import * as React from "react";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

function useHydrated() {
  return React.useSyncExternalStore(
    React.useCallback(() => () => {}, []),
    () => true,
    () => false
  );
}

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHydrated();

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative text-foreground hover:text-primary"
    >
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
