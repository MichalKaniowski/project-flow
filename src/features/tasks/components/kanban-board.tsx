"use client";

import { Badge } from "@/components/ui/primitives/badge";
import { Button } from "@/components/ui/primitives/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/primitives/dropdown-menu";
import { TaskTag } from "@/features/tasks/components/task-tag";
import { taskQueryKeys } from "@/features/tasks/task-query-key-factory";
import { Priority, Type } from "@/generated/prisma";
import { kyInstance } from "@/lib/ky";
import { formatDate, getColumnsWithTasks } from "@/lib/utils";
import { ColumnsWithTasksInfo, ProjectData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Plus,
} from "lucide-react";

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-950/70 dark:border-red-800/50 font-semibold";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-amber-950/50 dark:text-amber-300 dark:hover:bg-amber-950/70 dark:border-amber-800/50 font-semibold";
    case "Low":
      return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:hover:bg-emerald-950/70 dark:border-emerald-800/50 font-semibold";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800/70 dark:border-gray-700/50 font-semibold";
  }
};

const getTypeColor = (type: Type) => {
  switch (type) {
    case "Task":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-950/50 dark:text-purple-300 dark:hover:bg-purple-950/70 dark:border-purple-800/50 font-semibold";
    case "Feature":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-950/70 dark:border-blue-800/50 font-semibold";
    case "Bug":
      return "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-950/70 dark:border-red-800/50 font-semibold";
    default:
      return "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-950/50 dark:text-purple-300 dark:hover:bg-purple-950/70 dark:border-purple-800/50 font-semibold";
  }
};

export function KanbanBoard({
  project: { id: projectId, tasks: initialTasks, statuses: projectStatuses },
}: {
  project: ProjectData;
}) {
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
            className="flex flex-col min-w-80 overflow-y-auto"
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
                <div key={task.id}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="font-medium text-sm leading-tight">
                          {task.title}
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-0 w-6 h-6"
                            >
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="mb-3 text-gray-500 dark:text-gray-400 text-xs line-clamp-2">
                        {task.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {task.tags?.map((tag) => (
                          <TaskTag
                            key={tag.id}
                            tag={tag}
                            isHighlighted={true}
                          />
                        ))}
                      </div>

                      <div className="mb-3">
                        <Badge
                          className={`text-xs ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </Badge>
                        <Badge className={`text-xs ${getTypeColor(task.type)}`}>
                          {task.type}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-xs">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(task.targetDate)}</span>
                          </div>
                          {/* features to be added */}
                          {/* {task.comments > 0 && (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{task.comments}</span>
                        </div>
                      )}
                      {task.attachments > 0 && (
                        <div className="flex items-center gap-1">
                          <Paperclip className="w-3 h-3" />
                          <span>{task.attachments}</span>
                        </div>
                      )} */}
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>5</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Paperclip className="w-3 h-3" />
                            <span>2</span>

                            {/* assignee to be added */}
                            {/* <Avatar className="w-6 h-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback className="text-xs">
                        {task.assignee.avatar}
                      </AvatarFallback>
                    </Avatar> */}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
