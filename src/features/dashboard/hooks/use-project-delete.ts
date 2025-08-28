import { Project } from "@/generated/prisma";
import { getErrorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProject } from "../actions/delete-project";
import { dashboardQueryKeys } from "../dashboard-query-key-factory";

export const useProjectDelete = ({
  projectId,
  onDialogClose,
}: {
  projectId: string;
  onDialogClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const queryKey = dashboardQueryKeys.projectsList;

  return useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData<{ projects: Project[] }>(queryKey, (oldData) => {
        if (!oldData) return { projects: [] };

        return {
          projects: oldData.projects.filter(
            (project) => project.id !== projectId
          ),
        };
      });

      toast.success("Project deleted successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
    onSettled: () => {
      onDialogClose();
    },
  });
};
