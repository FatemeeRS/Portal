import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeMode } from "@enterprise/design-tokens";

interface UiState {
  colorMode: ThemeMode;
  toggleColorMode: () => void;
}

// FRONTEND.md: "Global state only" for Zustand; "Persistence only where necessary" — the
// color-mode preference is exactly that kind of cross-feature, worth-remembering state.
export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      colorMode: "light",
      toggleColorMode: () => set({ colorMode: get().colorMode === "light" ? "dark" : "light" })
    }),
    { name: "backoffice-ui" }
  )
);
