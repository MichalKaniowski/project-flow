"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/primitives/card";
import { Project } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";
import { ProjectCardOptions } from "./project-card-delete-dialog";

export const ProjectCard = ({ project }: { project: Project }) => {
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
          <Link href={`/projects/${project.id}/tasks`}>
            <h2>{project.name}</h2>
          </Link>
        </div>

        <ProjectCardOptions project={project} />
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
