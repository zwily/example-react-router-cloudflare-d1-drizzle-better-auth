import type { Route } from "./+types/auth";
import { createBetterAuthFromContext } from "~/lib/auth.server";

export function loader({ request, context }: Route.LoaderArgs) {
  const auth = createBetterAuthFromContext(context);
  return auth.handler(request);
}

export function action({ request, context }: Route.ActionArgs) {
  const auth = createBetterAuthFromContext(context);
  return auth.handler(request);
}
