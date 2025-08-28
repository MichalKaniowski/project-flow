"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/primitives/button";
import { Card, CardContent } from "@/components/ui/primitives/card";
import { Input } from "@/components/ui/primitives/input";
import { Label } from "@/components/ui/primitives/label";
import { signUpSchema, SignUpValues } from "@/features/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, FolderIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/use-signup";
import { SocialSection } from "./social-section";

interface SignupFormProps {
  toggleSignupMode: () => void;
}

export const SignupForm = ({ toggleSignupMode }: SignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    mutate: signupMutate,
    isPending: isSignupPending,
    error: signupError,
  } = useSignup();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpValues) => {
    signupMutate(values);
  };

  return (
    <div className="flex justify-center items-center bg-background p-4 w-full">
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
            Welcome, let&apos;s create an account!
          </p>
        </div>

        {/* Signup Card */}
        <Card className="shadow-lg mx-auto w-[95%] max-w-[400px]">
          <CardContent className="space-y-4 mt-7">
            {signupError && (
              <p className="text-destructive text-sm text-center">
                {signupError.message}
              </p>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Name</Label>
                <Input
                  id="displayName"
                  placeholder="John Doe"
                  className="w-full"
                  {...form.register("displayName")}
                />
                {form.formState.errors.displayName && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.displayName.message}
                  </p>
                )}
              </div>
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

              <LoadingButton
                type="submit"
                className="!mt-6 w-full"
                loading={isSignupPending}
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                {isSignupPending ? "Signing up..." : "Sign up"}
              </LoadingButton>
            </form>

            <SocialSection />

            <div className="text-center">
              <div className="text-muted-foreground text-sm text-center">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="px-0 text-primary hover:text-primary/80"
                  onClick={toggleSignupMode}
                >
                  Sign in
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
