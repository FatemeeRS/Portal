import { useMemo, type PropsWithChildren } from "react";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { createAppTheme, type ThemeDirection } from "@enterprise/design-tokens";
import { createEmotionCache } from "../theme/emotion-cache";
import { rtlLanguages, type SupportedLanguage } from "../i18n/i18n";
import { useUiStore } from "../store/ui-store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1
    }
  }
});

export function AppProviders({ children }: PropsWithChildren) {
  const { i18n } = useTranslation();
  const colorMode = useUiStore((state) => state.colorMode);

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
