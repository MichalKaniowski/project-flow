"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/primitives/button";
import { Card, CardContent } from "@/components/ui/primitives/card";
import { Input } from "@/components/ui/primitives/input";
import { Label } from "@/components/ui/primitives/label";
import { login } from "@/features/auth/actions/login";
import { loginSchema, type LoginValues } from "@/features/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, FolderIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SocialSection } from "./social-section";

interface LoginFormProps {
  toggleSignupMode: () => void;
  onTurnForgotPasswordModeOn: () => void;
}

export const LoginForm = ({
  toggleSignupMode,
  onTurnForgotPasswordModeOn,
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setIsLoading(true);
    setError("");
    const { error } = await login(values);
    setIsLoading(false);
    if (error) setError(error);
  };

  return (
    <div className="flex justify-center items-center bg-background mx-auto p-4 w-full">
      <div className="mx-auto w-full max-w-md">
        {/* Logo and Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="flex justify-center items-center bg-foreground rounded-lg w-8 h-8">
              <FolderIcon className="w-5 h-5 text-background" />
            </div>
            <h1 className="font-bold text-foreground text-2xl">ProjectFlow</h1>
          </div>
          <p className="text-muted-foreground">
            Welcome back! Sign in to your account
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg mx-auto w-[95%] max-w-[400px]">
          <CardContent className="space-y-4 mt-7">
            {error && (
              <p className="text-destructive text-sm text-center">{error}</p>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pr-10 w-full"
                    {...form.register("password")}
                  />
                  {form.formState.errors.password && (
                    <p className="text-destructive text-sm">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="top-0 right-0 absolute px-3 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="button"
                variant="link"
                className="!mt-[2px] !mb-2 !px-0 text-primary hover:text-primary/80 text-sm"
                onClick={onTurnForgotPasswordModeOn}
              >
                Forgot password?
              </Button>

              <LoadingButton
                type="submit"
                className="w-full"
                loading={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </LoadingButton>
            </form>

            <SocialSection />

            <div className="text-center">
              <div className="text-muted-foreground text-sm text-center">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="px-0 text-primary hover:text-primary/80"
                  onClick={toggleSignupMode}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
