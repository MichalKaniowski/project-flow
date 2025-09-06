"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";

export const deleteTask = async (taskId: string) => {
  const { user } = await validateRequest();
  if (!user) throw Error("Unathorized");

  const deletedTask = await prisma.task.delete({ where: { id: taskId } });

  return deletedTask;
};
