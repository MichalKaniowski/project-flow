import { LoadingButton } from "@/components/ui/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/primitives/form";
import { Input } from "@/components/ui/primitives/input";
import { Textarea } from "@/components/ui/primitives/textarea";
import { Tag } from "@/generated/prisma";
import { kyInstance } from "@/lib/ky";
import { TagsInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { taskQueryKeys } from "../task-query-key-factory";
import { CreateTaskValues } from "../validation";
import { CreateTaskSheetAssigneeField } from "./create-task-sheet/create-task-sheet-assigne-field";
import { CreateTaskSheetDropdowns } from "./create-task-sheet/create-task-sheet-dropdowns";
import { CreateNewTagButton } from "./create-task-sheet/create-task-sheet-new-tag-button";
import { TaskTag } from "./task-tag";

interface TaskFormFieldsProps {
  form: UseFormReturn<CreateTaskValues>;
  projectId: string;
  isLoading: boolean;
  chosenTagIds: string[];
  initialTags: Tag[];
  formType: "create" | "modify";
  onTagClick: (tagId: string) => void;
  onFormSubmit: (values: CreateTaskValues) => void;
}

export const TaskFormFields = ({
  form,
  projectId,
  isLoading,
  chosenTagIds,
  initialTags,
  formType,
  onTagClick,
  onFormSubmit,
}: TaskFormFieldsProps) => {
  // this query will be never called, it's for state managment only
  const { data: tagsData } = useQuery({
    queryKey: taskQueryKeys.getTags(projectId),
    queryFn: () =>
      kyInstance.get(`/api/projects/${projectId}/tags`).json<TagsInfo>(),
    initialData: { tags: initialTags },
    staleTime: Infinity,
  });

  const submitText = formType === "create" ? "Create" : "Modify";
  const loadingSubmitText =
    formType === "create" ? "Creating..." : "Modifying...";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
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
                        onClick={() => onTagClick(tag.id)}
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
            loading={isLoading}
            type="submit"
            className="rounded-lg"
          >
            {isLoading ? loadingSubmitText : submitText}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
