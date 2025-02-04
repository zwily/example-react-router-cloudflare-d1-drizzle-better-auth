import { Form, useNavigate, Link } from "react-router";
import { useState } from "react";
import { createBetterAuthClient } from "~/lib/auth";
import { cn } from "~/lib/utils";

export default function SignUp() {
  const authClient = createBetterAuthClient();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          navigate("/");
        },
        onError: (ctx) => {
          setError(ctx.error.message);
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
      <h2>Sign Up</h2>

      <Form onSubmit={signUp} className="flex flex-col items-start gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
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
          Already have an account?{" "}
          <Link to="/signin" className="text-sm text-gray-500">
            Sign in.
          </Link>
        </p>
      </Form>
    </div>
  );
}
