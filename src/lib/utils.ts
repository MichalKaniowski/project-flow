import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function getErrorMessage(error: unknown): string {
  if (error === undefined || error === null) {
    return "An unknown error occurred";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof ZodError) {
    return error.errors
      .map((validationError) => {
        const path = validationError.path.join(".");
        return path
          ? `${path}: ${validationError.message}`
          : validationError.message;
      })
      .join("\n");
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
}
