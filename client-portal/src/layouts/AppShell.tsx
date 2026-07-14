import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Phase 4 replaces the AppBar title with the real Header (logo + nav from
// GET /api/portal/navigation) and adds the Sidebar alongside <Outlet />.
export function AppShell() {
  const { t } = useTranslation();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Toolbar>
          <Typography variant="h3" component="h1">
            {t("app.title")}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: { xs: 2, md: 4 } }}>
        <Outlet />
      </Box>
    </Box>
  );
}
