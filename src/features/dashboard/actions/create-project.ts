"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";
import { CreateProjectValues } from "../validation";

export const createProject = async (values: CreateProjectValues) => {
  try {
    const { user } = await validateRequest();
    if (!user) return { error: "Unauthorized" };

    const createdProject = await prisma.project.create({
      data: {
        ...values,
        userId: user.id,
      },
    });

    return { createdProject };
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
};
