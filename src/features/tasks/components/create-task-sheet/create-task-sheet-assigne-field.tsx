import { Button } from "@/components/ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/primitives/dropdown-menu";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/primitives/form";
import { UseFormReturn } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { CreateTaskValues } from "../../validation";

export const CreateTaskSheetAssigneeField = ({
  form,
}: {
  form: UseFormReturn<CreateTaskValues>;
}) => {
  return (
    <FormField
      control={form.control}
      name="assignee"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="block">Assignee</FormLabel>
          <FormControl>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-between w-full">
                  {field.value}
                  <IoIosArrowDown size={12} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem onSelect={() => field.onChange("John Doe")}>
                  John Doe
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => field.onChange("Bob Smith")}>
                  Bob Smith
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
