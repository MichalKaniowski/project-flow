"use server";

import { validateRequest } from "@/auth";
import { Priority, Type } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";
import { addTaskSchema, AddTaskValues } from "../validation";

export const createTask = async (data: AddTaskValues, projectId: string) => {
  try {
    const { user } = await validateRequest();
    if (!user) return { error: "Unauthorized" };

    const validatedData = addTaskSchema.parse(data);
    const task = await prisma.task.create({
      data: {
        ...validatedData,
        status: validatedData.status,
        type: validatedData.type.replace(" ", "_") as Type,
        priority: validatedData.priority.replace(" ", "_") as Priority,
        projectId,
      },
    });

    return { task };
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
};
