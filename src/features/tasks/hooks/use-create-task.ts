import { ColumnsWithTasksInfo } from "@/types";
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

      queryClient.setQueryData<ColumnsWithTasksInfo>(queryKey, (prev) => {
        if (!prev) return { columnsWithTasks: [] };

        return {
          columnsWithTasks: prev.columnsWithTasks.map((column) => {
            if (column.id === task.statusId) {
              return {
                ...column,
                tasks: [task, ...column.tasks],
              };
            }
            return column;
          }),
        };
      });

      toast.success("Task created successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create task");
    },
  });
};
