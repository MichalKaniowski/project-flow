"use client";

import { useSession } from "@/features/auth/store/auth-context";
import { redirect } from "next/navigation";

export default function BehindAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // checking auth in layout should not be trusted, we do it for convenience, and we check auth always when accessing data
  const { user } = useSession();
  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
