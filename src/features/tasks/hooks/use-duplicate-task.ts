import { ColumnsWithTasksInfo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { duplicateTask } from "../actions/duplicate-task";
import { taskQueryKeys } from "../task-query-key-factory";

export const useDuplicateTask = (projectId: string) => {
  const queryClient = useQueryClient();
  const queryKey = taskQueryKeys.getColumns(projectId);

  return useMutation({
    mutationFn: duplicateTask,
    onSuccess: async (duplicatedTask) => {
      await queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData<ColumnsWithTasksInfo>(queryKey, (prev) => {
        if (!prev) return { columnsWithTasks: [] };

        return {
          columnsWithTasks: prev.columnsWithTasks.map((column) => {
            if (column.id === duplicatedTask.statusId) {
              return {
                ...column,
                tasks: [duplicatedTask, ...column.tasks],
              };
            }

            return column;
          }),
        };
      });

      toast.success("Duplicated task succesfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
