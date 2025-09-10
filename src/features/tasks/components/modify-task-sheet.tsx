"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/primitives/sheet";
import { ProjectData, TaskData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useModifyTask } from "../hooks/use-modify-task";
import { createTaskSchema, CreateTaskValues } from "../validation";
import { TaskFormFields } from "./task-form-fields";

export const ModifyTaskSheet = ({
  project: { id: projectId, tags: initialTags },
  task,
  isOpen,
  onToggleOpen,
}: {
  project: ProjectData;
  task: TaskData;
  isOpen: boolean;
  onToggleOpen: (isOpen: boolean) => void;
}) => {
  const { mutate: modifyTaskMutate, isPending: isModifyingTask } =
    useModifyTask({ projectId });

  const [chosenTagIds, setChosenTagIds] = useState<string[]>(
    task.tags.map((tag) => tag.id)
  );

  const form = useForm<CreateTaskValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: task.title,
      assignee: task.assignee,
      targetDate: task.targetDate,
      statusName: task.status.name,
      priority: task.priority,
      type: task.type,
      description: task.description || "",
    },
  });

  const handleModifyTask = async (values: CreateTaskValues) => {
    modifyTaskMutate(
      { data: { ...values, tagIds: chosenTagIds }, taskId: task.id, projectId },
      {
        onSuccess: () => {
          form.reset();
          onToggleOpen(false);
        },
      }
    );
  };

  const handleTagClick = (tagId: string) => {
    setChosenTagIds((prevTags) => {
      if (prevTags.includes(tagId)) {
        return prevTags.filter((id) => id !== tagId);
      }
      return [...prevTags, tagId];
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onToggleOpen}>
      <SheetContent className="min-w-full sm:min-w-[450px]">
        <SheetHeader className="mb-4">
          <SheetTitle>Modify Task</SheetTitle>
        </SheetHeader>

        <TaskFormFields
          form={form}
          initialTags={initialTags}
          projectId={projectId}
          isLoading={isModifyingTask}
          chosenTagIds={chosenTagIds}
          formType="modify"
          onFormSubmit={handleModifyTask}
          onTagClick={handleTagClick}
        />
      </SheetContent>
    </Sheet>
  );
};
