"use client";

import { Input } from "@/components/ui/primitives/input";
import { AddProjectSheet } from "@/features/dashboard/components/add-project-sheet";
import { ProjectsList } from "@/features/dashboard/components/projects-list";
import { Project } from "@/generated/prisma";
import { useDebounce } from "@/hooks/use-debounce";
import { kyInstance } from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";

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

  const searchProjects = useMemo(() => {
    return projects?.filter((project) =>
      project.name
        .toLowerCase()
        .includes(projectNameSearchDeferred.trim().toLowerCase())
    );
  }, [projects, projectNameSearchDeferred]);

  const { pinnedProjects, unpinnedProjects } = useMemo(
    () => ({
      pinnedProjects: searchProjects?.filter((project) => project.pinned),
      unpinnedProjects: searchProjects?.filter((project) => !project.pinned),
    }),
    [searchProjects]
  );

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
          <AddProjectSheet />
        </div>
        <div className="space-y-3">
          {!!pinnedProjects?.length && (
            <ProjectsList
              projects={pinnedProjects}
              listName="Pinned"
              refetch={refetch}
            />
          )}
          {!!unpinnedProjects?.length && (
            <ProjectsList
              projects={unpinnedProjects}
              listName="Other"
              refetch={refetch}
            />
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
