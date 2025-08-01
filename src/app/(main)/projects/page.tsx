"use client";

import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/primitives/sheet";
import { ProjectCard } from "@/features/dashboard/components/project-card";
import { Project } from "@/generated/prisma";
import { useDebounce } from "@/hooks/use-debounce";
import { kyInstance } from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { AddProjectForm } from "../../../features/dashboard/components/add-project-form";

export default function ProjectsPage() {
  const {
    data: projects,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => kyInstance.get("/api/projects").json<Project[]>(),
  });

  const [projectNameSearch, setProjectNameSearch] = useState("");
  const projectNameSearchDeferred = useDebounce(projectNameSearch, 500);
  const searchProjects = projects?.filter((project) =>
    project.name
      .toLowerCase()
      .includes(projectNameSearchDeferred.trim().toLowerCase())
  );
  const pinnedProjects = searchProjects?.filter((project) => project.pinned);
  const unpinnedProjects = searchProjects?.filter((project) => !project.pinned);

  return (
    <div className="relative w-full h-full">
      <div className="mx-auto px-2 py-4 max-w-7xl">
        <h1 className="mb-4 font-bold text-3xl">Projects</h1>
        <div className="flex items-center gap-3 mb-6 w-full">
          <Input
            placeholder="Search projects"
            value={projectNameSearch}
            onChange={(e) => setProjectNameSearch(e.target.value)}
          />
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm">Add Project</Button>
            </SheetTrigger>
            <SheetContent className="space-y-6">
              <SheetHeader className="mb-4">
                <SheetTitle>Add Project</SheetTitle>
              </SheetHeader>

              <AddProjectForm />
            </SheetContent>
          </Sheet>
        </div>
        <div className="space-y-3">
          {!!pinnedProjects?.length && (
            <div>
              <h2 className="font-bold text-2xl">Pinned Projects</h2>
              <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {pinnedProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    refetch={refetch}
                  />
                ))}
              </div>
            </div>
          )}
          {!!unpinnedProjects?.length && (
            <div>
              {!!pinnedProjects?.length && (
                <h2 className="font-bold text-2xl">Other</h2>
              )}
              <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {unpinnedProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    refetch={refetch}
                  />
                ))}
              </div>
            </div>
          )}
          {!pinnedProjects?.length &&
            !unpinnedProjects?.length &&
            !isLoading && <p>No projects found</p>}
          {isLoading && <Loader2 className="animate-spin" />}
        </div>
      </div>
    </div>
  );
}
