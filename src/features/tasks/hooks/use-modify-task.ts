import { ColumnsWithTasksInfo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { modifyTask } from "../actions/modify-task";
import { taskQueryKeys } from "../task-query-key-factory";

export const useModifyTask = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient();
  const queryKey = taskQueryKeys.getColumns(projectId);

  return useMutation({
    mutationFn: modifyTask,
    onSuccess: async (modifiedTask) => {
      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<ColumnsWithTasksInfo>(queryKey, (prev) => {
        if (!prev) return { columnsWithTasks: [] };

        return {
          columnsWithTasks: prev.columnsWithTasks.map((column) => {
            const columnTasks = column.tasks.filter(
              (task) => task.id !== modifiedTask.id
            );

            if (column.id === modifiedTask.statusId) {
              return {
                ...column,
                tasks: [modifiedTask, ...columnTasks],
              };
            }
            return { ...column, tasks: columnTasks };
          }),
        };
      });

      toast.success("Task modified successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to modify task");
    },
  });
};
