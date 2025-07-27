"use client";

import { LoginView } from "@/features/auth/components/login-view";
import { SignupForm } from "@/features/auth/components/signup-form";
import { useState } from "react";

export default function LoginPage() {
  const [isSignupMode, setIsSignupMode] = useState(false);

  const toggleSignupMode = () => {
    setIsSignupMode(!isSignupMode);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {isSignupMode ? (
        <SignupForm toggleSignupMode={toggleSignupMode} />
      ) : (
        <LoginView toggleMode={toggleSignupMode} />
      )}
    </div>
  );
}
