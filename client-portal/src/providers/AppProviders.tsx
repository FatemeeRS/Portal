import { useMemo, useState, useEffect, type PropsWithChildren } from "react";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { createAppTheme, type ThemeDirection, type ThemeMode } from "@enterprise/design-tokens";
import { createEmotionCache } from "../theme/emotion-cache";
import { rtlLanguages, type SupportedLanguage } from "../i18n/i18n";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Public content changes rarely; a longer staleTime avoids refetching on every mount.
      staleTime: 60_000,
      retry: 1
    }
  }
});

function usePreferredColorMode(): ThemeMode {
  const [mode, setMode] = useState<ThemeMode>(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (event: MediaQueryListEvent) => setMode(event.matches ? "dark" : "light");
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return mode;
}

export function AppProviders({ children }: PropsWithChildren) {
  const { i18n } = useTranslation();
  const colorMode = usePreferredColorMode();

  const direction: ThemeDirection = rtlLanguages.has(i18n.language as SupportedLanguage) ? "rtl" : "ltr";

  const emotionCache = useMemo(() => createEmotionCache(direction), [direction]);
  const theme = useMemo(() => createAppTheme(colorMode, direction), [colorMode, direction]);

  document.dir = direction;
  document.documentElement.lang = i18n.language;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
