import { createTheme, type Theme } from "@mui/material/styles";
import { colorsFor, tokens, type ThemeMode } from "./tokens";

export type ThemeDirection = "ltr" | "rtl";

function typographyVariant(entry: (typeof tokens.typeScale)[keyof typeof tokens.typeScale]) {
  return {
    fontFamily: entry.fontFamily,
    fontWeight: entry.fontWeight,
    fontSize: entry.fontSize,
    lineHeight: entry.lineHeight,
    letterSpacing: entry.letterSpacing
  };
}

export function createAppTheme(mode: ThemeMode, direction: ThemeDirection): Theme {
  const colors = colorsFor(mode);

  return createTheme({
    direction,
    palette: {
      mode,
      primary: { main: colors.primary.main, contrastText: colors.primary.contrastText },
      secondary: { main: colors.secondary.main, contrastText: colors.secondary.contrastText },
      success: { main: colors.success.main, contrastText: colors.success.contrastText },
      warning: { main: colors.warning.main, contrastText: colors.warning.contrastText },
      error: { main: colors.error.main, contrastText: colors.error.contrastText },
      info: { main: colors.info.main, contrastText: colors.info.contrastText },
      background: { default: colors.background.default, paper: colors.surface.default },
      divider: colors.divider,
      text: { primary: colors.text.primary, secondary: colors.text.secondary, disabled: colors.text.disabled }
    },
    shape: { borderRadius: 8 },
    spacing: (factor: number) => `${tokens.spacing[factor] ?? factor * 8}px`,
    breakpoints: {
      values: {
        xs: tokens.breakpoints.mobile,
        sm: tokens.breakpoints.tablet,
        md: tokens.breakpoints.laptop,
        lg: tokens.breakpoints.desktop,
        xl: tokens.breakpoints.wide
      }
    },
    typography: {
      fontFamily: tokens.fontFamily.secondary,
      h1: typographyVariant(tokens.typeScale.display),
      h2: typographyVariant(tokens.typeScale.headline),
      h3: typographyVariant(tokens.typeScale.title),
      subtitle1: typographyVariant(tokens.typeScale.subtitle),
      body1: typographyVariant(tokens.typeScale.body),
      caption: typographyVariant(tokens.typeScale.caption),
      overline: typographyVariant(tokens.typeScale.overline),
      button: typographyVariant(tokens.typeScale.button)
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: tokens.radius.md, textTransform: "none" }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: { borderRadius: tokens.radius.lg }
        }
      },
      MuiCssBaseline: {
        styleOverrides: {
          "*": { transitionDuration: `${tokens.motion.base} !important` }
        }
      }
    }
  });
}
