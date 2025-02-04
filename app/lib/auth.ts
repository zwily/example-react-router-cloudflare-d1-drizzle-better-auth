import { createAuthClient } from "better-auth/react";

export function createBetterAuthClient() {
  return createAuthClient({
    baseURL: "http://localhost:5173", // the base url of your auth server
  });
}
