import { Form, useNavigate, redirect, Link } from "react-router";
import { useState } from "react";
import { createBetterAuthClient } from "~/lib/auth";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/signin";
import { getSession } from "~/lib/auth.server";

export async function loader(args: Route.LoaderArgs) {
  const session = await getSession(args);

  if (session) {
    throw redirect("/");
  }

  return null;
}

export default function SignIn() {
  const authClient = createBetterAuthClient();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          navigate("/");
          setLoading(false);
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      }
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col items-start border border-gray-200 p-4 rounded-md",
        loading && "opacity-50"
      )}
    >
      <h2>Sign In</h2>

      <Form onSubmit={signIn} className="flex flex-col items-start gap-2">
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="text-red-500">{error}</div>}

        <button type="submit" disabled={loading} className="mt-4">
          Sign In
        </button>

        <p>
          Need an account?{" "}
          <Link to="/signup" className="text-sm text-gray-500">
            Sign up.
          </Link>
        </p>
      </Form>
    </div>
  );
}
