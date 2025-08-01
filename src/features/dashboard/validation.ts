import { requiredString } from "@/lib/validation";
import { z } from "zod";

export const createProjectSchema = z.object({
  name: requiredString,
  abstract: requiredString,
  targetUser: requiredString,
});
export type CreateProjectValues = z.infer<typeof createProjectSchema>;
