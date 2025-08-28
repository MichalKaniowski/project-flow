import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  assignee: z.string().min(1, "Assignee is required"),
  targetDate: z.date(),
  status: z.string().min(1, "Status is required"),
  priority: z.enum(["Low", "Medium", "High"]),
  type: z.enum(["Feature", "Bug", "Task"]),
  description: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
});

export type CreateTaskValues = z.infer<typeof createTaskSchema>;

export const createTagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  styleId: z.string().min(1, "Style ID is required"),
  projectId: z.string().min(1, "Project ID is required"),
});

export type CreateTagValues = z.infer<typeof createTagSchema>;
