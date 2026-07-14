import axios from "axios";

// Phase 3 adds the JWT-refresh interceptor once the auth feature (§05 of the plan) exists.
// The base client is scaffolded now so every feature's api/ layer has one place to import from.
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://localhost:5001/api/backoffice",
  headers: { "Content-Type": "application/json" }
});
