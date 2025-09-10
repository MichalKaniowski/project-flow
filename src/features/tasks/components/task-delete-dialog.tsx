import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/primitives/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/primitives/dialog";
import { Input } from "@/components/ui/primitives/input";
import { useState } from "react";
import { useDeleteTask } from "../hooks/use-delete-task";

export const TaskDeleteDialog = ({
  taskId,
  projectId,
  isOpen,
  onToggleOpen,
}: {
  taskId: string;
  projectId: string;
  isOpen: boolean;
  onToggleOpen: (isOpen: boolean) => void;
}) => {
  const [deleteTaskInputText, setDeleteTaskInputText] = useState("");
  const { mutate: deleteTaskMutate, isPending: isDeletingTaskPending } =
    useDeleteTask({ projectId, onClose: () => onToggleOpen(false) });

  const handleDeleteTask = () => {
    deleteTaskMutate(taskId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onToggleOpen}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader className="mb-4">
          <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        </DialogHeader>

        <p>
          Please type <b>Delete task</b> to delete this task. After deletion, it
          cannot be undone!
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDeleteTask();
          }}
        >
          <Input
            value={deleteTaskInputText}
            onChange={(e) => setDeleteTaskInputText(e.target.value)}
          />
          <div className="gap-2 grid grid-cols-2 mt-7">
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <LoadingButton
              loading={isDeletingTaskPending}
              variant="destructive"
              disabled={deleteTaskInputText !== "Delete task"}
              type="submit"
            >
              {isDeletingTaskPending ? "Deleting..." : "Delete"}
            </LoadingButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
