import { Button } from "@/components/ui/primitives/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/primitives/sheet";
import { AddProjectForm } from "../../../features/dashboard/components/add-project-form";

export const AddProjectSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">Add Project</Button>
      </SheetTrigger>
      <SheetContent className="space-y-6">
        <SheetHeader className="mb-4">
          <SheetTitle>Add Project</SheetTitle>
        </SheetHeader>

        <AddProjectForm />
      </SheetContent>
    </Sheet>
  );
};
