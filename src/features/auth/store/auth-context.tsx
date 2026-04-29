"use client";

import { supabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface SessionContext {
  user: User | null;
}

const SessionContext = createContext<SessionContext | null>(null);

export const SessionProvider = ({
  children,
  user: initialUser,
}: React.PropsWithChildren<{ user: User }>) => {
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ user }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};
