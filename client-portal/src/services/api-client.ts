import axios from "axios";

// Fully public, anonymous client — Api.Portal never requires a token.
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://localhost:5002/api/portal",
  headers: { "Content-Type": "application/json" }
});
