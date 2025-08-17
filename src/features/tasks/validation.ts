import { z } from "zod";

export const addTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  assignee: z.string().min(1, "Assignee is required"),
  targetDate: z.date(),
  status: z.enum(["Backlog", "In Progress", "In Review", "Done"]),
  priority: z.enum(["Low", "Medium", "High"]),
  type: z.enum(["Feature", "Bug", "Task"]),
  description: z.string().optional(),
});

export type AddTaskValues = z.infer<typeof addTaskSchema>;
