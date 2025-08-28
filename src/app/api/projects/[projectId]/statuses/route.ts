import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";
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

    const statuses = await prisma.status.findMany({
      where: {
        projectId,
      },
    });

    return NextResponse.json({ statuses });
  } catch (err) {
    return NextResponse.json({ error: getErrorMessage(err) });
  }
};
