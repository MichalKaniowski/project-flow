import LoginPage from "@/app/(auth)/login/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";

jest.mock("@/features/auth/actions/login", () => ({
  login: jest.fn(),
}));
jest.mock("@/features/auth/actions/signup", () => ({
  signup: jest.fn(),
}));

jest.mock("next/navigation", () =>
  jest.requireActual("next-router-mock/navigation")
);

const mockLoginReference = require("@/features/auth/actions/login").login;
const mockSignupReference = require("@/features/auth/actions/signup").signup;

describe("LoginForm (via LoginPage)", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should allow to navigate to signup form and back to login form", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const signupButton = screen.getByRole("button", { name: /Sign up/i });
    expect(signupButton).toBeInTheDocument();

    await user.click(signupButton);
    expect(await screen.findByText("Welcome, let's create an account!"));

    await user.click(screen.getByRole("button", { name: /Sign in/i }));
    expect(await screen.findByText("Welcome back! Sign in to your account"));
  });

  it("should disable login button when not all fields are filled, otherwise it's enabled", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const loginButton = screen.getByRole("button", { name: /Sign in/i });

    await user.type(emailInput, "test@example.com");
    expect(loginButton).toBeDisabled();

    await user.type(passwordInput, "password");
    expect(loginButton).not.toBeDisabled();
  });

  it("should throw an error if field is incorrect", async () => {
    const user = userEvent.setup();
    mockLoginReference.mockResolvedValue({
      error: "Incorrect email or password",
    });

    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const loginButton = screen.getByRole("button", { name: /Sign in/i });

    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(loginButton);

    expect(
      await screen.findByText("Incorrect email or password")
    ).toBeInTheDocument();
  });

  it("should redirect user to /projects if login is successful", async () => {
    const user = userEvent.setup();

    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const loginButton = screen.getByRole("button", { name: /Sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "validpassword");
    await user.click(loginButton);

    expect(mockRouter.asPath).toBe("/projects");
  });

  it("should disable login button when email format is invalid", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const loginButton = screen.getByRole("button", { name: /Sign in/i });

    await user.type(emailInput, "invalid-email");
    await user.type(passwordInput, "password123");

    expect(loginButton).toBeDisabled();
  });

  it("should show loading state during login submission", async () => {
    const user = userEvent.setup();
    mockLoginReference.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({}), 100))
    );

    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const loginButton = screen.getByRole("button", { name: /Sign in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(loginButton);

    expect(screen.getByText("Signing in...")).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  it("should toggle password visibility when eye icon is clicked", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const toggleButton = screen.getByRole("button", { name: "" });

    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});

describe("SignupForm (via LoginPage)", () => {
  beforeEach(async () => {
    jest.resetAllMocks();

    // switch to signup mode
    const user = userEvent.setup();
    render(<LoginPage />);
    const signupButton = screen.getByRole("button", { name: /Sign up/i });
    await user.click(signupButton);
  });

  it("should allow to navigate to login form and back to signup form", async () => {
    const user = userEvent.setup();

    expect(
      await screen.findByText("Welcome, let's create an account!")
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Sign in/i }));
    expect(
      await screen.findByText("Welcome back! Sign in to your account")
    ).toBeInTheDocument();
  });

  it("should allow submitting only when all required fields are filled", async () => {
    const user = userEvent.setup();

    const nameInput = screen.getByPlaceholderText(/John Doe/i);
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const signupButton = screen.getByRole("button", { name: /Sign up/i });

    expect(signupButton).toBeDisabled();

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    expect(signupButton).not.toBeDisabled();
  });

  it("should disable submit button when fields are invalid", async () => {
    const user = userEvent.setup();

    const nameInput = screen.getByPlaceholderText(/John Doe/i);
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const signupButton = screen.getByRole("button", { name: /Sign up/i });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "invalid-email");
    await user.type(passwordInput, "password123");
    expect(signupButton).toBeDisabled();

    await user.clear(emailInput);
    await user.clear(passwordInput);
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "short");
    expect(signupButton).toBeDisabled();

    await user.clear(emailInput);
    await user.clear(passwordInput);
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "long-enough-password");
    expect(signupButton).not.toBeDisabled();
  });

  it("should show error when email already exists", async () => {
    const user = userEvent.setup();
    mockSignupReference.mockResolvedValue({
      error: "Email already taken",
    });

    const nameInput = screen.getByPlaceholderText(/John Doe/i);
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const signupButton = screen.getByRole("button", { name: /Sign up/i });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "existing@example.com");
    await user.type(passwordInput, "password123");
    await user.click(signupButton);

    expect(await screen.findByText("Email already taken")).toBeInTheDocument();
  });

  it("should show generic error for server errors", async () => {
    const user = userEvent.setup();
    mockSignupReference.mockResolvedValue({
      error: "Something went wrong. Please try again.",
    });

    const nameInput = screen.getByPlaceholderText(/John Doe/i);
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const signupButton = screen.getByRole("button", { name: /Sign up/i });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(signupButton);

    expect(
      await screen.findByText("Something went wrong. Please try again.")
    ).toBeInTheDocument();
  });

  it("should redirect to /projects after successful signup", async () => {
    const user = userEvent.setup();

    const nameInput = screen.getByPlaceholderText(/John Doe/i);
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const signupButton = screen.getByRole("button", { name: /Sign up/i });

    await user.type(nameInput, "Test User");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(signupButton);

    expect(mockRouter.asPath).toBe("/projects");
  });

  it("should show loading state during signup submission", async () => {
    const user = userEvent.setup();
    mockSignupReference.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({}), 100))
    );

    const nameInput = screen.getByPlaceholderText(/John Doe/i);
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const signupButton = screen.getByRole("button", { name: /Sign up/i });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(signupButton);

    expect(screen.getByText("Signing up...")).toBeInTheDocument();
    expect(signupButton).toBeDisabled();
  });

  it("should toggle password visibility when eye icon is clicked", async () => {
    const user = userEvent.setup();

    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);

    const passwordContainer = passwordInput.closest("div");
    const toggleButton = passwordContainer?.querySelector(
      'button[type="button"]'
    );

    expect(passwordInput).toHaveAttribute("type", "password");

    if (toggleButton) {
      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute("type", "text");

      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute("type", "password");
    } else {
      throw new Error("Password toggle button not found");
    }
  });
});
