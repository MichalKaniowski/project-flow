import { Button } from "@/components/ui/primitives/button";
import { TabsContent } from "@/components/ui/primitives/tabs";
import { SettingsCard } from "./ui/settings-card";

export const DangerzoneSettingsTab = () => {
  return (
    <TabsContent value="danger-zone">
      <SettingsCard title="Delete Project" isDangerZone>
        <div>
          <p className="mb-6 text-muted-foreground">
            You can delete your project if you're done with it
          </p>
          <Button variant="destructive">Delete project</Button>
        </div>
      </SettingsCard>
    </TabsContent>
  );
};
