"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { TaskData, taskDataInclude } from "@/types";

export const duplicateTask = async (task: TaskData) => {
  const { user } = await validateRequest();
  if (!user) throw Error("Unathorized");

  const { id, status, tags, ...taskData } = task;

  const duplicatedTask = await prisma.task.create({
    data: { ...taskData, tags: { connect: tags } },
    include: taskDataInclude,
  });

  return duplicatedTask;
};
