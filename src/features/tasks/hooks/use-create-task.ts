import { Task } from "@/generated/prisma";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createTask } from "../actions/create-task";
import { taskQueryKeys } from "../task-query-key-factory";

export const useCreateTask = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient();
  const queryKey = taskQueryKeys.getColumns(projectId);

  return useMutation({
    mutationFn: createTask,
    onSuccess: async (task) => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<{ tasks: Task[] }>(
        queryKey
      );

      queryClient.setQueryData<{ tasks: Task[] }>(queryKey, (prev) => {
        if (!prev) return { tasks: [task] };

        return {
          tasks: [...prev.tasks, task],
        };
      });

      toast.success("Task created successfully");

      return { previousState };
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create task");
    },
  });
};
