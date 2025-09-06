"use client";

import { Button } from "@/components/ui/primitives/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/primitives/sheet";
import { ProjectData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateTask } from "../../hooks/use-create-task";
import { createTaskSchema, CreateTaskValues } from "../../validation";
import { TaskFormFields } from "../task-form-fields";

export const CreateTaskSheet = ({
  project: { id: projectId, tags: initialTags },
}: {
  project: ProjectData;
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [chosenTagIds, setChosenTagIds] = useState<string[]>([]);

  const { mutate: createTaskMutate, isPending: isCreatingTask } = useCreateTask(
    { projectId }
  );

  const form = useForm<CreateTaskValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      assignee: "John Doe",
      targetDate: new Date(),
      statusName: "Backlog",
      priority: "Medium",
      type: "Feature",
      description: "",
    },
  });

  const handleCreateTask = async (values: CreateTaskValues) => {
    createTaskMutate(
      {
        data: { ...values, tagIds: chosenTagIds },
        projectId,
      },
      {
        onSuccess: () => {
          form.reset();
          setIsSheetOpen(false);
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
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button>Create Task</Button>
      </SheetTrigger>
      <SheetContent className="min-w-full sm:min-w-[450px]">
        <SheetHeader className="mb-4">
          <SheetTitle>Create Task</SheetTitle>
        </SheetHeader>

        <TaskFormFields
          form={form}
          initialTags={initialTags}
          projectId={projectId}
          isLoading={isCreatingTask}
          chosenTagIds={chosenTagIds}
          formType="create"
          onFormSubmit={handleCreateTask}
          onTagClick={handleTagClick}
        />
      </SheetContent>
    </Sheet>
  );
};
