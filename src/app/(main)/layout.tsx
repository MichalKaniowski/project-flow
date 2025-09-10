import { validateRequest } from "@/auth";
import { SessionProvider } from "@/components/providers/session-provider";
import { redirect } from "next/navigation";
import type React from "react";
import "../globals.css";
import { Navbar } from "./_components/navbar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

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
