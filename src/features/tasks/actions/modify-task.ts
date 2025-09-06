"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { taskDataInclude } from "@/types";
import { CreateTaskValues } from "../validation";

interface ModifyTaskArgs {
  data: CreateTaskValues;
  taskId: string;
  projectId: string;
}

export const modifyTask = async ({
  data,
  taskId,
  projectId,
}: ModifyTaskArgs) => {
  const { user } = await validateRequest();
  if (!user) throw Error("Unathorized");

  const { statusName, tagIds, ...taskData } = data;
  const dbStatus = await prisma.status.findUnique({
    where: {
      name_projectId: {
        name: statusName,
        projectId,
      },
    },
  });
  if (!dbStatus) throw Error("Status not found");

  const modifiedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      ...taskData,
      statusId: dbStatus.id,
      tags: { set: tagIds?.map((id) => ({ id })) || [] },
    },
    include: taskDataInclude,
  });

  return modifiedTask;
};
