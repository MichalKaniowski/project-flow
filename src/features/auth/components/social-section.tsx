import { Separator } from "@/components/ui/primitives/separator";
import { GoogleLoginButton } from "./google-login-button";

export const SocialSection = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div
        className="gap-3"
        // grid grid-cols-2
      >
        <GoogleLoginButton text="Google" />
        {/* <GithubLoginButton text="Github" /> */}
      </div>
    </>
  );
};
