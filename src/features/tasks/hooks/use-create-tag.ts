import { TagsInfo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createTag } from "../actions/create-tag";
import { taskQueryKeys } from "../task-query-key-factory";

export const useCreateTag = ({
  projectId,
  onSetNewTagName,
  onSetIsAddingTag,
}: {
  projectId: string;
  onSetNewTagName: (newTagName: string) => void;
  onSetIsAddingTag: (isAddingTag: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const queryKey = taskQueryKeys.getTags(projectId);

  return useMutation({
    mutationFn: createTag,
    onSuccess: async (data) => {
      await queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData<TagsInfo>(queryKey, (prev) => {
        if (!prev) return { tags: [data.tag] };
        return {
          tags: [...prev.tags, data.tag],
        };
      });

      toast.success(`Tag "${data?.tag?.name || ""}" added successfully`);
    },

    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      onSetNewTagName("");
      onSetIsAddingTag(false);
    },
  });
};
