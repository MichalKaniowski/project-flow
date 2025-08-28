import { LoadingButton } from "@/components/ui/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/primitives/form";
import { Input } from "@/components/ui/primitives/input";
import { sendResetPasswordEmail } from "@/features/auth/actions/send-reset-password-email";
import {
  forgotPasswordSchema,
  ForgotPasswordValues,
} from "@/features/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ForgotPasswordFormProps {
  onTurnForgotPasswordModeOff: () => void;
}

export const ForgotPasswordForm = ({
  onTurnForgotPasswordModeOff,
}: ForgotPasswordFormProps) => {
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: ForgotPasswordValues) => {
    try {
      setIsLoading(true);
      const res = await sendResetPasswordEmail(values);

      const error = res?.error;
      if (error) return toast.error(error);

      toast.success(
        "Email with reset password link has been sent successfully. Check your inbox and spam folder."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto px-1 w-full max-w-[300px]">
      <div className="items-center mb-8 w-full">
        <button
          onClick={onTurnForgotPasswordModeOff}
          className="flex items-center gap-2 text-foreground/70 hover:text-foreground/80"
        >
          <MoveLeft size={16} />
          <span className="text-sm">go back</span>
        </button>
      </div>
      <h1 className="mb-4 font-semibold text-xl">Reset your password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your email"
                    className="dark:border-white/20 h-12 dark:placeholder:text-white/40"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            type="submit"
            className="bg-foreground hover:bg-foreground/90 mt-4 w-full font-bold text-background"
            loading={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset password"}
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};
