import { KanbanBoard } from "@/components/kanban-board";
import { Button } from "@/components/ui/primitives/button";

export default async function ProjectTasksPage() {
  return (
    <div className="flex-1 p-4 overflow-hidden">
      <div className="flex justify-between items-center py-3">
        <h1 className="font-semibold text-3xl">Tasks</h1>
        <Button>Add Task</Button>
      </div>
      <KanbanBoard />
    </div>
  );
}
