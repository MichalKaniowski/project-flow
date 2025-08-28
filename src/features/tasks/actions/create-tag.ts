"use server";

import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createTagSchema, CreateTagValues } from "../validation";

export const createTag = async (data: CreateTagValues) => {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const parsedData = createTagSchema.parse(data);

  const tag = await prisma.tag.create({
    data: parsedData,
  });

  return { tag };
};
