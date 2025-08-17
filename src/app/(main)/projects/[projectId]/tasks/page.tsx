import { KanbanBoard } from "@/components/kanban-board";
import { AddTaskSheet } from "@/features/tasks/components/add-task-sheet";

export default async function ProjectTasksPage({
  params,
}: {
  params: { projectId: string };
}) {
  return (
    <div className="flex-1 p-4 overflow-hidden">
      <div className="flex justify-between items-center py-3">
        <h1 className="font-semibold text-3xl">Tasks</h1>
        <AddTaskSheet projectId={(await params).projectId} />
      </div>
      <KanbanBoard />
    </div>
  );
}
