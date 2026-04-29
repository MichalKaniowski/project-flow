import { SessionProvider } from "@/features/auth/store/auth-context";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function BehindAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // checking auth in layout should not be trusted, we do it for convenience, and we check auth always when accessing data
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (!user || user.error || !user.data.user) {
    redirect("/login");
  }

  return <SessionProvider user={user.data.user}>{children}</SessionProvider>;
}
