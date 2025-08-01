import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const { user } = await validateRequest();

    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const projects = await prisma.project.findMany({
      where: { userId: user.id },
    });

    return Response.json(projects);
  } catch (error) {
    console.error("here: ", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
