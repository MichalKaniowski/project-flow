"use client";

import { Button } from "@/components/ui/primitives/button";
import { signOut } from "@/features/auth/actions/sign-out";
import { useState } from "react";

export default function DashboardPage() {
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    const { error } = await signOut();
    setError(error ?? "");
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
}
