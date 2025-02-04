import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { type Database } from "~/database";

import type { AppLoadContext } from "react-router";
import { redirect } from "react-router";
export function createBetterAuth({
  db,
  baseURL,
}: {
  db: Database;
  baseURL: string;
}) {
  return betterAuth({
    baseURL,
    database: drizzleAdapter(db, {
      provider: "sqlite",
    }),
    emailAndPassword: {
      enabled: true,
    },
  });
}

export function createBetterAuthFromContext(context: AppLoadContext) {
  return createBetterAuth({
    db: context.db,
    baseURL: context.cloudflare.env.BETTER_AUTH_URL,
  });
}

type GetSessionArgs = {
  context: AppLoadContext;
  request: Request;
};

export async function getSession({ context, request }: GetSessionArgs) {
  const auth = createBetterAuthFromContext(context);
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  return session;
}

export async function requireSession(
  {
    context,
    request,
  }: {
    context: AppLoadContext;
    request: Request;
  },
  redirectTo: string
) {
  const session = await getSession({ context, request });
  if (!session) {
    throw redirect(redirectTo);
  }

  return session;
}
