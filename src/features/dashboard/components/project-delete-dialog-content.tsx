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
import { useProjectDelete } from "../hooks/use-project-delete";

export const ProjectDeleteDialogContent = ({
  projectId,
  onDialogClose,
}: {
  projectId: string;
  onDialogClose: () => void;
}) => {
  const [deleteProjectInputText, setDeleteProjectInputText] = useState("");
  const { mutate: deleteProjectMutate, isPending: isDeletingProjectPending } =
    useProjectDelete({ projectId, onDialogClose });

  const handleDeleteProject = async () => {
    await deleteProjectMutate();
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
            loading={isDeletingProjectPending}
            variant="destructive"
            disabled={deleteProjectInputText !== "Delete project"}
            type="submit"
          >
            {isDeletingProjectPending ? "Deleting..." : "Delete"}
          </LoadingButton>
        </div>
      </form>
    </DialogContent>
  );
};
