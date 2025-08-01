"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";

export const pinProject = async (projectId: string) => {
  try {
    const { user } = await validateRequest();
    if (!user) return { error: "Unauthorized" };

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) return { error: "Project not found" };

    await prisma.project.update({
      where: { id: projectId },
      data: {
        pinned: !project.pinned,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
};
