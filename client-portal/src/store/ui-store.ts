import { create } from "zustand";

interface UiState {
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
}

// The public portal has no business state to speak of — this is the one piece of
// cross-component UI state (mobile nav open/closed), matching FRONTEND.md's "global state only".
export const useUiStore = create<UiState>((set) => ({
  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open })
}));
