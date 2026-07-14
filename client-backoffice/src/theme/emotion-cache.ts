import createCache, { type EmotionCache } from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import type { ThemeDirection } from "@enterprise/design-tokens";

/**
 * FRONTEND.md: "Emotion Cache must switch automatically" with locale direction.
 * Two caches (one per direction) so switching locale doesn't require a full reload.
 */
export function createEmotionCache(direction: ThemeDirection): EmotionCache {
  return direction === "rtl"
    ? createCache({ key: "mui-rtl", stylisPlugins: [prefixer, rtlPlugin] })
    : createCache({ key: "mui", stylisPlugins: [prefixer] });
}
