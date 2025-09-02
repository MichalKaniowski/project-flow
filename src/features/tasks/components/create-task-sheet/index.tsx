"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/primitives/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/primitives/form";
import { Input } from "@/components/ui/primitives/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/primitives/sheet";
import { Textarea } from "@/components/ui/primitives/textarea";
import { kyInstance } from "@/lib/ky";
import { ProjectData, TagsInfo } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateTask } from "../../hooks/use-create-task";
import { taskQueryKeys } from "../../task-query-key-factory";
import { createTaskSchema, CreateTaskValues } from "../../validation";
import { TaskTag } from "../task-tag";
import { CreateTaskSheetAssigneeField } from "./create-task-sheet-assigne-field";
import { CreateTaskSheetDropdowns } from "./create-task-sheet-dropdowns";
import { CreateNewTagButton } from "./create-task-sheet-new-tag-button";

export const CreateTaskSheet = ({
  project: { id: projectId, tags: initialTags },
}: {
  project: ProjectData;
}) => {
  // this query will be never called, it's for state managment only
  const { data: tagsData } = useQuery({
    queryKey: taskQueryKeys.getTags(projectId),
    queryFn: () =>
      kyInstance.get(`/api/projects/${projectId}/tags`).json<TagsInfo>(),
    initialData: { tags: initialTags },
    staleTime: Infinity,
  });
  const { mutate: createTaskMutate, isPending: isCreatingTask } = useCreateTask(
    { projectId }
  );

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [chosenTagIds, setChosenTagIds] = useState<string[]>([]);

  const form = useForm<CreateTaskValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      assignee: "John Doe",
      targetDate: new Date(),
      status: "Backlog",
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateTask)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add login feature"
                      {...field}
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CreateTaskSheetAssigneeField form={form} />

            <FormField
              control={form.control}
              name="targetDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CreateTaskSheetDropdowns form={form} projectId={projectId} />

            <FormField
              control={form.control}
              name="tagIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {tagsData?.tags.map((tag) => (
                          <button
                            key={tag.id}
                            onClick={() => handleTagClick(tag.id)}
                            type="button"
                          >
                            <TaskTag
                              tag={tag}
                              isHighlighted={chosenTagIds.includes(tag.id)}
                            />
                          </button>
                        ))}
                      </div>
                      <div className="mt-2">
                        <CreateNewTagButton projectId={projectId} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Add login, signup and oauth functionalities."
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center">
              <LoadingButton
                loading={isCreatingTask}
                type="submit"
                className="rounded-lg"
              >
                {isCreatingTask ? "Creating..." : "Create"}
              </LoadingButton>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
