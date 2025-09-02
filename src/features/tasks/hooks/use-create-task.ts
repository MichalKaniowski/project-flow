import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createTask } from "../actions/create-task";
import { taskQueryKeys } from "../task-query-key-factory";
import { ColumnWithTasks } from "./../../../components/kanban-board2";

export const useCreateTask = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient();
  const queryKey = taskQueryKeys.getColumns(projectId);

  return useMutation({
    mutationFn: createTask,
    onSuccess: async (task) => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<{
        columnsWithTasks: ColumnWithTasks[];
      }>(queryKey);

      queryClient.setQueryData<{ columnsWithTasks: ColumnWithTasks[] }>(
        queryKey,
        (prev) => {
          if (!prev) return { columnsWithTasks: [] };

          return {
            columnsWithTasks: prev.columnsWithTasks.map((column) => {
              if (column.id === task.statusId) {
                return {
                  ...column,
                  tasks: [...column.tasks, task],
                };
              }
              return column;
            }),
          };
        }
      );

      toast.success("Task created successfully");

      return { previousState };
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create task");
    },
  });
};
