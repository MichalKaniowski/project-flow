import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/primitives/button";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/primitives/dialog";
import { Input } from "@/components/ui/primitives/input";
import { useState } from "react";
import { toast } from "sonner";
import { deleteProject } from "../actions/delete-project";

export const ProjectDeleteDialogContent = ({
  projectId,
  onDialogClose,
  refetch,
}: {
  projectId: string;
  onDialogClose: () => void;
  refetch: () => void;
}) => {
  const [deleteProjectInputText, setDeleteProjectInputText] = useState("");
  const [isDeletingProject, setIsDeletingProject] = useState(false);

  const handleDeleteProject = async () => {
    setIsDeletingProject(true);
    const data = await deleteProject(projectId);
    setIsDeletingProject(false);

    refetch();

    if (data?.error) {
      toast.error(data.error);
    }
    toast.success("Project deleted successfully");
    onDialogClose();
  };
  return (
    <DialogContent>
      <DialogHeader className="mb-4">
        <DialogTitle>Are you sure you want to delete this project?</DialogTitle>
      </DialogHeader>

      <p>
        Please type <b>Delete project</b> to delete this project. After
        deletion, it cannot be undone!
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDeleteProject();
        }}
      >
        <Input
          value={deleteProjectInputText}
          onChange={(e) => setDeleteProjectInputText(e.target.value)}
        />
        <div className="gap-2 grid grid-cols-2 mt-7">
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <LoadingButton
            loading={isDeletingProject}
            variant="destructive"
            disabled={deleteProjectInputText !== "Delete project"}
            type="submit"
          >
            {isDeletingProject ? "Deleting..." : "Delete"}
          </LoadingButton>
        </div>
      </form>
    </DialogContent>
  );
};
