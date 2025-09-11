"use client";

import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/primitives/select";
import { TabsContent } from "@/components/ui/primitives/tabs";
import { ProjectData } from "@/types";
import { useState } from "react";
import { TimezoneSelect } from "./timezone-select";
import { SettingsCard } from "./ui/settings-card";

export const GeneralSettingsTab = ({ project }: { project: ProjectData }) => {
  const [projectName, setProjectName] = useState(project.name);

  return (
    <TabsContent value="general" className="space-y-4 w-full">
      <SettingsCard title="Project Name">
        <div>
          <p className="mb-6 text-muted-foreground">
            To update your project name, please fill the form below
          </p>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Enter project name"
              className="w-full max-w-[350px] h-11"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <Button>Update</Button>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Project Icon">
        <div>
          <p className="mb-6 text-muted-foreground">
            To update your project icon, please upload here
          </p>
          <div className="flex items-center gap-2">
            <Input type="file" className="w-full max-w-[350px] h-11" />
            <Button>Save Icon</Button>
          </div>
        </div>
      </SettingsCard>
      <SettingsCard title="Project Status">
        <div>
          <p className="mb-6 text-muted-foreground">
            To update your project status, please select from the dropdown below
          </p>
          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger>Building</SelectTrigger>

              <SelectContent>
                <SelectItem value="stale">Stale</SelectItem>
                <SelectItem value="in-progress">Building</SelectItem>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Button>Save Timezone</Button>
          </div>
        </div>
      </SettingsCard>
      <SettingsCard title="Timezone">
        <div>
          <p className="mb-6 text-muted-foreground">
            To update your project timezone, please select from the dropdown
          </p>
          <div className="flex items-center gap-2">
            <TimezoneSelect />

            <Button>Save Timezone</Button>
          </div>
        </div>
      </SettingsCard>
    </TabsContent>
  );
};
