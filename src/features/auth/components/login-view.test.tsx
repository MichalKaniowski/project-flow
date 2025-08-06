import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginView } from "./login-view";

describe("LoginView", () => {
  it("should navigate between login and forgot password forms", async () => {
    const user = userEvent.setup();
    const mockToggleMode = jest.fn();

    render(<LoginView toggleMode={mockToggleMode} />);

    await user.click(screen.getByRole("button", { name: "Forgot password?" }));

    expect(
      screen.getByRole("heading", { name: "Reset your password" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "go back" }));

    expect(
      screen.getByText("Welcome back! Sign in to your account")
    ).toBeInTheDocument();
  });
});
