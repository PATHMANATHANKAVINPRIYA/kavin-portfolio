"use client";

import { ThemeProvider as NextThemesProvider, Attribute } from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: Attribute;
}

export function ThemeProvider({ children, attribute }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute || "class"}
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
