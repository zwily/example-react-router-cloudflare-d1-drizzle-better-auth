import { createContext, useContext } from "react";
import { createAuthClient } from "better-auth/react";

export const BetterAuthContext = createContext<ReturnType<
  typeof createAuthClient
> | null>(null);

export function BetterAuthProvider({
  baseURL,
  children,
}: {
  baseURL: string;
  children: React.ReactNode;
}) {
  const authClient = createAuthClient({ baseURL });

  return (
    <BetterAuthContext.Provider value={authClient}>
      {children}
    </BetterAuthContext.Provider>
  );
}

export function useBetterAuthClient() {
  const authClient = useContext(BetterAuthContext);
  if (!authClient) {
    throw new Error("useBetterAuth must be used within a BetterAuthProvider");
  }
  return authClient;
}
