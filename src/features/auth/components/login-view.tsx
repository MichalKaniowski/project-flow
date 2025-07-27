import { useState } from "react";
import { ForgotPasswordForm } from "./forgot-password-form";
import { LoginForm } from "./login-form";

export const LoginView = ({ toggleMode }: { toggleMode: () => void }) => {
  const [isInForgotPasswordMode, setIsInForgotPasswordMode] = useState(false);

  return isInForgotPasswordMode ? (
    <ForgotPasswordForm
      onTurnForgotPasswordModeOff={() => setIsInForgotPasswordMode(false)}
    />
  ) : (
    <LoginForm
      toggleSignupMode={toggleMode}
      onTurnForgotPasswordModeOn={() => setIsInForgotPasswordMode(true)}
    />
  );
};
