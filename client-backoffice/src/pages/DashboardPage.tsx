import { Card, CardContent, Stack, Typography } from "@mui/material";

const upcomingModules = ["Navigation", "Sidebar", "Slider", "News", "Media", "Audit log"];

export function DashboardPage() {
  return (
    <Stack spacing={2} sx={{ maxWidth: 640 }}>
      <Typography variant="h2" component="h2">
        Foundation ready
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Theme, RTL, i18n, routing, and data-fetching are wired. Content modules land in Phase 2/3.
      </Typography>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            Upcoming modules
          </Typography>
          <Stack spacing={0.5}>
            {upcomingModules.map((module) => (
              <Typography key={module} variant="body1" color="text.secondary">
                {module}
              </Typography>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
