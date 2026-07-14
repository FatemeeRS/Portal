/**
 * DESIGN.md §"Design Tokens": semantic, token-driven values only — never a raw hex/px value
 * inside a component. One export per required category; consumed by theme.ts to build the
 * MUI theme, and importable directly wherever a raw token value is needed outside MUI's theme
 * object (e.g. inline SVG, canvas).
 */

export type ThemeMode = "light" | "dark";

const spacing = [0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 96, 128] as const;

const radius = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  full: "9999px"
} as const;

const motion = {
  fast: "120ms",
  base: "200ms",
  slow: "320ms",
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    decelerate: "cubic-bezier(0, 0, 0.2, 1)",
    accelerate: "cubic-bezier(0.4, 0, 1, 1)"
  }
} as const;

const opacity = {
  disabled: 0.38,
  hover: 0.08,
  selected: 0.12,
  focus: 0.16,
  pressed: 0.2,
  overlay: 0.5,
  scrim: 0.64
} as const;

const zIndex = {
  drawer: 1200,
  appBar: 1100,
  dialog: 1300,
  snackbar: 1400,
  tooltip: 1500
} as const;

// MUI's breakpoint system is architecturally ascending (min-width). DESIGN.md's "Desktop
// First" is a design-priority order, not a CSS direction — the values below still read
// desktop/laptop/tablet/mobile in that priority order, evaluated as min-width thresholds.
const breakpoints = {
  mobile: 0,
  tablet: 600,
  laptop: 960,
  desktop: 1280,
  wide: 1920
} as const;

const fontFamily = {
  primary: '"Vazirmatn", "Segoe UI", system-ui, sans-serif',
  secondary: '"Segoe UI", system-ui, sans-serif',
  mono: 'ui-monospace, "Cascadia Code", Consolas, monospace'
} as const;

type TypeScaleEntry = {
  fontFamily: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: number;
  letterSpacing: string;
};

const typeScale: Record<
  "display" | "headline" | "title" | "subtitle" | "body" | "caption" | "overline" | "button" | "input" | "code",
  TypeScaleEntry
> = {
  display: { fontFamily: fontFamily.primary, fontWeight: 700, fontSize: "2.5rem", lineHeight: 1.2, letterSpacing: "-0.01em" },
  headline: { fontFamily: fontFamily.primary, fontWeight: 700, fontSize: "1.75rem", lineHeight: 1.25, letterSpacing: "-0.005em" },
  title: { fontFamily: fontFamily.primary, fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.3, letterSpacing: "0" },
  subtitle: { fontFamily: fontFamily.secondary, fontWeight: 600, fontSize: "1rem", lineHeight: 1.4, letterSpacing: "0" },
  body: { fontFamily: fontFamily.secondary, fontWeight: 400, fontSize: "0.9375rem", lineHeight: 1.6, letterSpacing: "0" },
  caption: { fontFamily: fontFamily.secondary, fontWeight: 400, fontSize: "0.8125rem", lineHeight: 1.5, letterSpacing: "0.01em" },
  overline: { fontFamily: fontFamily.secondary, fontWeight: 600, fontSize: "0.6875rem", lineHeight: 1.4, letterSpacing: "0.08em" },
  button: { fontFamily: fontFamily.secondary, fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.4, letterSpacing: "0.02em" },
  input: { fontFamily: fontFamily.secondary, fontWeight: 400, fontSize: "0.9375rem", lineHeight: 1.5, letterSpacing: "0" },
  code: { fontFamily: fontFamily.mono, fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.6, letterSpacing: "0" }
};

type ColorScale = {
  primary: { main: string; hover: string; pressed: string; contrastText: string };
  secondary: { main: string; hover: string; pressed: string; contrastText: string };
  accent: { main: string; contrastText: string };
  success: { main: string; contrastText: string };
  warning: { main: string; contrastText: string };
  error: { main: string; contrastText: string };
  info: { main: string; contrastText: string };
  neutral: { main: string; contrastText: string };
  background: { default: string; elevated: string };
  surface: { default: string; variant: string };
  border: { default: string; strong: string };
  divider: string;
  text: { primary: string; secondary: string; disabled: string };
  icon: { default: string; muted: string };
  focus: string;
  overlay: string;
  scrim: string;
  skeleton: string;
  chart: string[];
};

const lightColors: ColorScale = {
  primary: { main: "#1F6F63", hover: "#195B51", pressed: "#134640", contrastText: "#FFFFFF" },
  secondary: { main: "#43505E", hover: "#333D48", pressed: "#252C34", contrastText: "#FFFFFF" },
  accent: { main: "#9C6118", contrastText: "#FFFFFF" },
  success: { main: "#1F6F63", contrastText: "#FFFFFF" },
  warning: { main: "#9C6118", contrastText: "#FFFFFF" },
  error: { main: "#A3392F", contrastText: "#FFFFFF" },
  info: { main: "#2B6CB0", contrastText: "#FFFFFF" },
  neutral: { main: "#7C8896", contrastText: "#FFFFFF" },
  background: { default: "#F3F5F7", elevated: "#FFFFFF" },
  surface: { default: "#FFFFFF", variant: "#EAEDF1" },
  border: { default: "#DCE2E8", strong: "#B7C0C9" },
  divider: "#DCE2E8",
  text: { primary: "#151A21", secondary: "#43505E", disabled: "#9AA5B1" },
  icon: { default: "#43505E", muted: "#7C8896" },
  focus: "#1F6F63",
  overlay: "rgba(21,26,33,0.5)",
  scrim: "rgba(21,26,33,0.64)",
  skeleton: "#EAEDF1",
  chart: ["#1F6F63", "#9C6118", "#2B6CB0", "#7C4DA0", "#A3392F", "#43505E"]
};

const darkColors: ColorScale = {
  primary: { main: "#4FB3A3", hover: "#6BC2B4", pressed: "#3C9083", contrastText: "#0B1512" },
  secondary: { main: "#C3CBD3", hover: "#D6DCE2", pressed: "#A9B3BD", contrastText: "#10141A" },
  accent: { main: "#E0A552", contrastText: "#241A08" },
  success: { main: "#4FB3A3", contrastText: "#0B1512" },
  warning: { main: "#E0A552", contrastText: "#241A08" },
  error: { main: "#E0847B", contrastText: "#2A0D0A" },
  info: { main: "#7EB0E6", contrastText: "#0C1B2A" },
  neutral: { main: "#8A96A3", contrastText: "#10141A" },
  background: { default: "#10141A", elevated: "#171D25" },
  surface: { default: "#171D25", variant: "#1E2731" },
  border: { default: "#2A333D", strong: "#3C4753" },
  divider: "#2A333D",
  text: { primary: "#EDF1F4", secondary: "#C3CBD3", disabled: "#5C6873" },
  icon: { default: "#C3CBD3", muted: "#8A96A3" },
  focus: "#4FB3A3",
  overlay: "rgba(0,0,0,0.6)",
  scrim: "rgba(0,0,0,0.72)",
  skeleton: "#1E2731",
  chart: ["#4FB3A3", "#E0A552", "#7EB0E6", "#B592DB", "#E0847B", "#C3CBD3"]
};

export const tokens = {
  spacing,
  radius,
  motion,
  opacity,
  zIndex,
  breakpoints,
  fontFamily,
  typeScale,
  color: { light: lightColors, dark: darkColors }
} as const;

export function colorsFor(mode: ThemeMode): ColorScale {
  return mode === "light" ? lightColors : darkColors;
}
