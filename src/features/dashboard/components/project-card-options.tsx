import { Dialog, DialogTrigger } from "@/components/ui/primitives/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/primitives/dropdown-menu";
import { Project } from "@/generated/prisma";
import { Loader2, Settings, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuPin } from "react-icons/lu";
import { usePinProject } from "../hooks/use-pin-project";
import { ProjectDeleteDialogContent } from "./project-delete-dialog-content";

interface ProjectCardOptionsProps {
  project: Project;
}

export const ProjectCardOptions = ({ project }: ProjectCardOptionsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const { mutate: pinProjectMutate, isPending: isPinningProjectPending } =
    usePinProject({
      projectId: project.id,
      onSettled: () => setIsDropdownMenuOpen(false),
    });

  const handlePinProject = async () => {
    pinProjectMutate();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu
        open={isDropdownMenuOpen}
        onOpenChange={setIsDropdownMenuOpen}
      >
        <DropdownMenuTrigger>
          <BsThreeDotsVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              handlePinProject();
            }}
            className="flex-row justify-between text-orange-500 focus:text-orange-400 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <LuPin size={14} />
              {project.pinned ? "Unpin" : "Pin"}
            </div>
            {isPinningProjectPending && <Loader2 className="animate-spin" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-foreground/70 focus:text-foreground/60"
            asChild
          >
            <Link
              href={`/projects/${project.id}/settings`}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Settings size={14} />
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <DialogTrigger className="w-full text-destructive focus:text-destructive/80 cursor-pointer">
              <Trash2 size={14} />
              Delete
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProjectDeleteDialogContent
        projectId={project.id}
        onDialogClose={() => setIsDialogOpen(false)}
      />
    </Dialog>
  );
};
