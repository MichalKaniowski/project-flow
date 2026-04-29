"use client";

import { Button } from "@/components/ui/primitives/button";
import { supabaseClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  return (
    <div>
      <Button onClick={() => supabaseClient.auth.signOut()}>Sign Out</Button>
    </div>
  );
}
