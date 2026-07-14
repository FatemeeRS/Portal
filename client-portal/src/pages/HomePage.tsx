import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

// Phase 4 composes Slider + Sidebar + News-grid here, each reading straight from the API.
export function HomePage() {
  const { t } = useTranslation();

  return (
    <Stack spacing={2}>
      <Typography variant="h2" component="h2">
        {t("news.sectionTitle")}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Theme, RTL, i18n, routing, and data-fetching are wired. Header, Sidebar, Slider and News
        rendering land in Phase 4.
      </Typography>
    </Stack>
  );
}
