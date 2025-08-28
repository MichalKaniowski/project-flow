import { Button } from "@/components/ui/primitives/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/primitives/sheet";
import { CreateProjectForm } from "./create-project-form";

export const CreateProjectSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">Create Project</Button>
      </SheetTrigger>
      <SheetContent className="space-y-6">
        <SheetHeader className="mb-4">
          <SheetTitle>Create Project</SheetTitle>
        </SheetHeader>

        <CreateProjectForm />
      </SheetContent>
    </Sheet>
  );
};
