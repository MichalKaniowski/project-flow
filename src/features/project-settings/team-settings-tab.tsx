import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { Label } from "@/components/ui/primitives/label";
import { TabsContent } from "@/components/ui/primitives/tabs";
import { SettingsCard } from "./components/ui/settings-card";

export const TeamSettingsTab = () => {
  return (
    <TabsContent value="team" className="w-full">
      <SettingsCard title="Add People">
        <div className="space-y-2 w-full">
          <p className="block mb-4 font-medium text-muted-foreground">
            To invite people to your project, send them an email invite using
            the form below
          </p>

          <div className="flex items-end gap-2">
            <div className="w-full max-w-[350px]">
              <Label htmlFor="email" className="h-11">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your-co-worker@example.com"
              />
            </div>
            <Button>Invite</Button>
          </div>
        </div>
      </SettingsCard>
    </TabsContent>
  );
};
