import { Project } from "@/generated/prisma";
import { ProjectCard } from "./project-card";

export const ProjectsList = ({
  projects,
  listName,
}: {
  projects: Project[];
  listName: string;
}) => {
  return (
    <div>
      <h2 className="mb-3 font-bold text-2xl">{listName}</h2>
      <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
