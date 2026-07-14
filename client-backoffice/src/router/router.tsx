import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { DashboardPage } from "../pages/DashboardPage";

// Phase 3 wraps the protected branch in AuthGuard / PermissionGuard and adds one route
// per module (navigation, sidebar-widgets, slider-items, news-items, audit-logs).
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [{ index: true, element: <DashboardPage /> }]
  }
]);
