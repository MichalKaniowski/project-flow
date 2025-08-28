import { validateRequest } from "@/auth";
import { Navbar } from "@/components/navbar";
import { SessionProvider } from "@/components/providers/session-provider";
import { redirect } from "next/navigation";
import type React from "react";
import "../globals.css";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  // this is for convenience and user experience, auth checks in the layout should not be trusted
  // the auth will be checked on the backend when getting data
  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <div className="relative flex flex-col w-screen h-screen">
        <Navbar />

        {children}
      </div>
    </SessionProvider>
  );
}
