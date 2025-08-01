"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/primitives/button";
import { Card, CardContent, CardHeader } from "@/components/ui/primitives/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/primitives/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/primitives/dropdown-menu";
import { Input } from "@/components/ui/primitives/input";
import { Project } from "@/generated/prisma";
import { Loader2, Settings, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuPin } from "react-icons/lu";
import { toast } from "sonner";
import { deleteProject } from "../actions/delete-project";
import { pinProject } from "../actions/pin-project";

export const ProjectCard = ({
  project,
  refetch,
}: {
  project: Project;
  refetch: () => void;
}) => {
  const [deleteProjectInputText, setDeleteProjectInputText] = useState("");
  const [isDeletingProject, setIsDeletingProject] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPinningProject, setIsPinningProject] = useState(false);
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const handleDeleteProject = async () => {
    setIsDeletingProject(true);
    const data = await deleteProject(project.id);
    refetch();
    if (data?.error) {
      toast.error(data.error);
    }
    toast.success("Project deleted successfully");
    setIsDeletingProject(false);
    setIsDialogOpen(false);
  };

  const handlePinProject = async () => {
    setIsPinningProject(true);
    const data = await pinProject(project.id);
    refetch();
    setIsPinningProject(false);
    setIsDropdownMenuOpen(false);
    if (data?.error) {
      toast.error(data.error);
    }
    toast.success("Project pinned successfully");
  };

  return (
    <Card className="relative">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/images/project-icon.png"
            width={26}
            height={26}
            alt="project-icon"
            className="rounded-md"
          />
          <h2>{project.name}</h2>
        </div>

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
                {isPinningProject && <Loader2 className="animate-spin" />}
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

          <DialogContent>
            <DialogHeader className="mb-4">
              <DialogTitle>
                Are you sure you want to delete this project?
              </DialogTitle>
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
                  Delete
                </LoadingButton>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <div>25% completed</div>
          <div>20/80 tasks</div>
        </div>

        <div className="relative rounded-full h-2 overflow-hidden">
          <div className="bg-primary w-[25%] h-full"></div>
        </div>

        <div>Last updated 2 days ago</div>
      </CardContent>
    </Card>
  );
};
