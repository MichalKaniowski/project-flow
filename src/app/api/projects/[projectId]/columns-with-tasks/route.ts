import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getColumnsWithTasks, getErrorMessage } from "@/lib/utils";
import { taskDataInclude } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { projectId: string } }
) => {
  try {
    const { user } = await validateRequest();
    if (!user) return NextResponse.json({ error: "Unauthorized" });

    const { projectId } = await params;
    if (!projectId) {
      throw new Error("Project ID is required");
    }

    const projectStatuses = await prisma.status.findMany({
      where: {
        projectId,
      },
    });
    const tasks = await prisma.task.findMany({
      where: {
        projectId,
      },
      include: taskDataInclude,
    });

    return NextResponse.json({
      columnsWithTasks: getColumnsWithTasks(tasks, projectStatuses),
    });
  } catch (err) {
    return NextResponse.json({ error: getErrorMessage(err) });
  }
};
