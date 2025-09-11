import { Tabs, TabsList, TabsTrigger } from "@/components/ui/primitives/tabs";
import { DangerzoneSettingsTab } from "@/features/project-settings/components/dangerzone-settings-tab";
import { FeaturesSettingsTab } from "@/features/project-settings/components/features-settings-tab";
import { GeneralSettingsTab } from "@/features/project-settings/components/general-settings-tab";
import { TeamSettingsTab } from "@/features/project-settings/team-settings-tab";
import { prisma } from "@/lib/prisma";
import { projectDataInclude } from "@/types";
import Link from "next/link";

export default async function ProjectSettingsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const projectId = (await params).projectId;
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: projectDataInclude,
  });
  if (!project) {
    return (
      <div className="py-4">
        <h1 className="mb-4 font-semibold text-xl">
          An error occurred while getting the project.
        </h1>
        <Link href="/projects" className="text-blue-500">
          Go back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 w-full">
      <h1 className="font-bold text-2xl">Project Settings</h1>
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="danger-zone">Danger Zone</TabsTrigger>
        </TabsList>

        <GeneralSettingsTab project={project} />

        <TeamSettingsTab />

        <FeaturesSettingsTab />

        <DangerzoneSettingsTab />
      </Tabs>
    </div>
  );
}
