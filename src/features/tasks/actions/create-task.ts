"use server";

import { validateRequest } from "@/auth";
import { Priority, Type } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { taskDataInclude } from "@/types";
import { createTaskSchema, CreateTaskValues } from "../validation";

type CreateTaskArgs = { data: CreateTaskValues; projectId: string };

export const createTask = async ({ data, projectId }: CreateTaskArgs) => {
  const { user } = await validateRequest();
  if (!user) throw Error("Unauthorized");

  const { status, tagIds, ...validatedData } = createTaskSchema.parse(data);
  const dbStatus = await prisma.status.findUnique({
    where: {
      name_projectId: {
        name: status,
        projectId,
      },
    },
  });
  if (!dbStatus) throw Error("Status not found");

  const task = await prisma.task.create({
    data: {
      ...validatedData,
      statusId: dbStatus?.id,
      type: validatedData.type.replace(" ", "_") as Type,
      priority: validatedData.priority.replace(" ", "_") as Priority,
      projectId,
      tags: { connect: tagIds?.map((id) => ({ id })) || [] },
    },
    include: taskDataInclude,
  });

  return { task };
};
