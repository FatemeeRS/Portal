import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "../layouts/AppShell";
import { HomePage } from "../pages/HomePage";

// Phase 1 client scope is a single landing page — no news detail route (plan §01 scope boundaries).
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [{ index: true, element: <HomePage /> }]
  }
]);
