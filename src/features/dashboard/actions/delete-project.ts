"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";

export const deleteProject = async (projectId: string) => {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });
};
