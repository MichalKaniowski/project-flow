import { Separator } from "@/components/ui/primitives/separator";
import { Switch } from "@/components/ui/primitives/switch";
import { TabsContent } from "@/components/ui/primitives/tabs";
import { SettingsCard } from "./ui/settings-card";

const features = [
  {
    name: "Roadmap",
    description: "Manage and visualize your project's timeline and milestones",
  },
  {
    name: "Finances",
    description: "Oversee project budgets, expenses, and financial forecasts",
  },
  {
    name: "Feedback",
    description: "Collect and manage feedback from users",
  },
  {
    name: "Messaging",
    description:
      "Facilitate communication within the team through direct messages and group chats",
  },
];

export const FeaturesSettingsTab = () => {
  return (
    <TabsContent value="features" className="w-full">
      <SettingsCard title="Features">
        <div>
          <p className="mb-6 text-muted-foreground">
            To hide and show items in the side navigation, you can enable or
            disable features here
          </p>
          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature.name}>
                <div className="items-center grid grid-cols-[90%_10%]">
                  <div>
                    <h3 className="font-medium text-lg">{feature.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </div>
      </SettingsCard>
    </TabsContent>
  );
};
