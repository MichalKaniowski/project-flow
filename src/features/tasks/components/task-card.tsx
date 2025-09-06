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
import { Sheet, SheetTrigger } from "@/components/ui/primitives/sheet";
import { TaskTag } from "@/features/tasks/components/task-tag";
import { Priority, Type } from "@/generated/prisma";
import { formatDate } from "@/lib/utils";
import { ProjectData, TaskData } from "@/types";
import {
  Calendar,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { IoDuplicate } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { useDeleteTask } from "../hooks/use-delete-task";
import { useDuplicateTask } from "../hooks/use-duplicate-task";
import { ModifyTaskSheetContent } from "./modify-task-sheet-content";

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

export const TaskCard = ({
  task,
  project,
}: {
  task: TaskData;
  project: ProjectData;
}) => {
  const { id: projectId } = project;
  const { mutate: deleteTaskMutate } = useDeleteTask(projectId);
  const { mutate: duplicateTaskMutate } = useDuplicateTask(projectId);
  const [isModifyTaskSheetOpen, setIsModifyTaskSheetOpen] = useState(false);

  const handleTaskDuplicate = () => {
    duplicateTaskMutate(task);
  };

  const handleTaskDelete = () => {
    deleteTaskMutate(task.id);
  };

  return (
    <div>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="font-medium text-sm leading-tight">
              {task.title}
            </CardTitle>

            {/* the Sheet and SheetTrigger componenets are part of ModifyTaskSheetContent, */}
            {/* but had to be placed outside of DropdownMenu to avoid closing the sheet when DropdownMenu closes */}
            <Sheet
              open={isModifyTaskSheetOpen}
              onOpenChange={setIsModifyTaskSheetOpen}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 w-6 h-6">
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="cursor-pointer">
                  <DropdownMenuItem
                    onClick={handleTaskDuplicate}
                    className="text-blue-200"
                  >
                    <IoDuplicate size={10} />
                    Duplicate
                  </DropdownMenuItem>

                  <SheetTrigger asChild>
                    <DropdownMenuItem className="text-orange-200">
                      {/* <MdEditSquare size={16} /> */}
                      <TbEdit size={16} />
                      Modify
                    </DropdownMenuItem>
                  </SheetTrigger>

                  <DropdownMenuItem
                    onClick={handleTaskDelete}
                    className="text-red-500"
                  >
                    <Trash2 size={14} />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ModifyTaskSheetContent
                task={task}
                project={project}
                onSheetClose={setIsModifyTaskSheetOpen}
              />
            </Sheet>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="mb-3 text-gray-500 dark:text-gray-400 text-xs line-clamp-2 whitespace-pre-wrap">
            {task.description}
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags?.map((tag) => (
              <TaskTag key={tag.id} tag={tag} isHighlighted={true} />
            ))}
          </div>

          <div className="mb-3">
            <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
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
  );
};
