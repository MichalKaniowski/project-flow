"use client";

import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { useState } from "react";
import { login } from "@/features/auth/actions/login";
import { redirect } from "next/navigation";
import { signup } from "@/features/auth/actions/signup";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    if (mode === "login") {
      const { data, error } = await login({ email, password });

      if (error) {
        setError(error);
      }

      if (!error && data) {
        redirect("/dashboard");
      }
    } else {
      const { data, error } = await signup({ email, password });

      if (error) {
        setError(error);
      }

      if (!error && data) {
        setMessage(
          "To confirm your email, please check your inbox and click the link in the email.",
        );
      }
    }

    setIsLoading(false);
  }

  return (
    <div>
      <h1>{mode === "login" ? "Login" : "Signup"}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleFormSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="button"
          variant="secondary"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          change mode
        </Button>
        <Button type="submit" disabled={isLoading}>
          {mode === "login"
            ? isLoading
              ? "Logging in..."
              : "Login"
            : isLoading
              ? "Signing up..."
              : "Signup"}
        </Button>
      </form>
    </div>
  );
}
