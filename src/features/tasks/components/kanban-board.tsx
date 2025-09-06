"use client";

import { Badge } from "@/components/ui/primitives/badge";
import { Button } from "@/components/ui/primitives/button";
import { taskQueryKeys } from "@/features/tasks/task-query-key-factory";
import { kyInstance } from "@/lib/ky";
import { getColumnsWithTasks } from "@/lib/utils";
import { ColumnsWithTasksInfo, ProjectData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { TaskCard } from "./task-card";

export function KanbanBoard({ project }: { project: ProjectData }) {
  const {
    id: projectId,
    tasks: initialTasks,
    statuses: projectStatuses,
  } = project;
  // this query will be never called, it's for state managment only
  const {
    data: { columnsWithTasks },
  } = useQuery({
    queryKey: taskQueryKeys.getColumns(projectId),
    queryFn: () =>
      kyInstance
        .get(`/api/projects/${projectId}/columns-with-tasks`)
        .json<ColumnsWithTasksInfo>(),
    initialData: {
      columnsWithTasks: getColumnsWithTasks(initialTasks, projectStatuses),
    },
    staleTime: Infinity,
  });

  return (
    <div className="flex gap-6 w-full h-full overflow-x-scroll scrollbar-hide">
      {columnsWithTasks.map((column) => {
        return (
          <div
            key={column.id}
            className="flex flex-col w-[25%] min-w-80 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 dark:text-gray-200">
                  {column.name}
                </h3>
                <Badge variant="secondary" className="rounded-full">
                  {column.tasks.length}
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-col flex-1 gap-3 overflow-y-auto scrollbar-hide">
              {column.tasks.map((task) => (
                <TaskCard key={task.id} task={task} project={project} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
