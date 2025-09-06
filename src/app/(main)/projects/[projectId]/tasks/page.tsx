import { validateRequest } from "@/auth";
import { CreateTaskSheet } from "@/features/tasks/components/create-task-sheet/create-task-sheet";
import { KanbanBoard } from "@/features/tasks/components/kanban-board";
import { prisma } from "@/lib/prisma";
import { ProjectData, projectDataInclude } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProjectTasksPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const project: ProjectData | null = await prisma.project.findUnique({
    where: {
      id: (await params).projectId,
    },
    include: projectDataInclude,
  });

  if (!project) {
    return (
      <div>
        Project not found
        <Link href="/projects">Go back to projects</Link>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 overflow-hidden">
      <div className="flex justify-between items-center py-3">
        <h1 className="font-semibold text-3xl">Tasks</h1>
        <CreateTaskSheet project={project} />
      </div>
      <KanbanBoard project={project} />
      {/* <KanbanBoard2 project={project} /> */}
    </div>
  );
}
