import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUiStore } from "../store/uiStore";

export function AdminLayout() {
  const { t } = useTranslation();
  const toggleColorMode = useUiStore((state) => state.toggleColorMode);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Toolbar>
          <Typography variant="h3" component="h1" sx={{ flexGrow: 1 }}>
            {t("app.title")}
          </Typography>
          <IconButton onClick={toggleColorMode} aria-label="toggle color mode">
            <Brightness4Icon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: { xs: 2, md: 4 } }}>
        <Outlet />
      </Box>
    </Box>
  );
}
