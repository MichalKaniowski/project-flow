import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import { cn } from "@/lib/utils";

export const SettingsCard = ({
  title,
  isDangerZone,
  children,
}: {
  title: string;
  isDangerZone?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Card
      className={cn(
        "bg-foreground/[0.02] border-foreground/5 border-b w-full overflow-hidden",
        isDangerZone && " border-red-500/80"
      )}
    >
      <CardHeader
        className={cn(
          "bg-foreground/[0.02] py-4 border-foreground/5 border-b",
          isDangerZone && "bg-red-500/80  border-red-500/80"
        )}
      >
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">{children}</CardContent>
    </Card>
  );
};
