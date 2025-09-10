import { ColumnsWithTasksInfo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteTask } from "../actions/delete-task";
import { taskQueryKeys } from "../task-query-key-factory";

export const useDeleteTask = ({
  projectId,
  onClose,
}: {
  projectId: string;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const queryKey = taskQueryKeys.getColumns(projectId);

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: async (deletedTask) => {
      await queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData<ColumnsWithTasksInfo>(queryKey, (prev) => {
        if (!prev) return { columnsWithTasks: [] };

        return {
          columnsWithTasks: prev.columnsWithTasks.map((column) => {
            if (column.id === deletedTask.statusId) {
              return {
                ...column,
                tasks: column.tasks.filter(
                  (task) => task.id !== deletedTask.id
                ),
              };
            }

            return column;
          }),
        };
      });

      toast.success("Deleted task succesfully");
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
