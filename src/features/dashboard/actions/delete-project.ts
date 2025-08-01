"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";

export const deleteProject = async (projectId: string) => {
  try {
    const { user } = await validateRequest();
    if (!user) return { error: "Unauthorized" };

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
};
