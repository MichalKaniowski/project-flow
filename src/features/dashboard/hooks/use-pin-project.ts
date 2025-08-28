import { Project } from "@/generated/prisma";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { pinProject } from "../actions/pin-project";
import { dashboardQueryKeys } from "../dashboard-query-key-factory";

export const usePinProject = ({
  projectId,
  onSettled,
}: {
  projectId: string;
  onSettled: () => void;
}) => {
  const queryClient = useQueryClient();
  const queryKey = dashboardQueryKeys.projectsList;

  return useMutation({
    mutationFn: () => pinProject(projectId),
    onSuccess: () => {
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData<{ projects: Project[] }>(queryKey, (oldData) => {
        if (!oldData) return { projects: [] };
        return {
          projects: oldData.projects.map((project) =>
            project.id === projectId
              ? { ...project, pinned: !project.pinned }
              : project
          ),
        };
      });
      toast.success("Project pinned successfully");
    },
    onError: () => {
      toast.error("Failed to pin project");
    },
    onSettled: () => {
      onSettled();
    },
  });
};
