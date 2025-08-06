import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/",
      query: {},
      asPath: "/",
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/font
jest.mock("next/font/google", () => ({
  Inter: () => ({
    className: "mock-inter-font",
  }),
}));

// Mock environment variables
process.env.NODE_ENV = "development";
process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000";

// Mock Lucia Auth
jest.mock("@lucia-auth/adapter-prisma", () => ({
  PrismaAdapter: jest.fn().mockImplementation(() => ({})),
}));

jest.mock("lucia", () => ({
  Lucia: jest.fn().mockImplementation(() => ({
    createSession: jest.fn(),
    validateSession: jest.fn(),
    invalidateSession: jest.fn(),
    invalidateUserSessions: jest.fn(),
  })),
}));

jest.mock("arctic", () => ({
  Google: jest.fn().mockImplementation(() => ({
    createAuthorizationURL: jest.fn(),
    validateAuthorizationCode: jest.fn(),
  })),
}));

// Mock Prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    session: {
      create: jest.fn(),
      delete: jest.fn(),
    },
    passwordResetToken: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

// Mock server actions
jest.mock("@/features/auth/actions/login", () => ({
  login: jest.fn(),
}));

jest.mock("@/features/auth/actions/signup", () => ({
  signup: jest.fn(),
}));
