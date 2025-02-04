import type { Route } from "./+types/home";
import { requireSession } from "~/lib/auth.server";
import { createBetterAuthClient } from "~/lib/auth";
import { useNavigate } from "react-router";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  const session = await requireSession(args, "/signin");

  return {
    userId: session.user.id,
    name: session.user.name,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const authClient = createBetterAuthClient();
  const navigate = useNavigate();

  const signOut = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      await authClient.signOut();
      navigate("/signin");
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <h1>Hello {loaderData.name}.</h1>

      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
