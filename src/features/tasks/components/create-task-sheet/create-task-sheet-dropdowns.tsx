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
import { kyInstance } from "@/lib/ky";
import { StatusesInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { taskQueryKeys } from "../../task-query-key-factory";
import { CreateTaskValues } from "../../validation";

export const CreateTaskSheetDropdowns = ({
  form,
  projectId,
}: {
  form: UseFormReturn<CreateTaskValues>;
  projectId: string;
}) => {
  const { data: statusesData } = useQuery({
    queryKey: taskQueryKeys.getStatuses(projectId),
    queryFn: () =>
      kyInstance
        .get(`/api/projects/${projectId}/statuses`)
        .json<StatusesInfo>(),
  });
  return (
    <div className="flex items-center gap-2">
      <FormField
        control={form.control}
        name="statusName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="block">Status</FormLabel>
            <FormControl>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="justify-between w-full">
                    {field.value}
                    <IoIosArrowDown size={12} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {statusesData?.statuses &&
                    statusesData.statuses.map((status) => (
                      <DropdownMenuItem
                        key={status.id}
                        onSelect={() => field.onChange(status.name)}
                      >
                        {status.name}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="priority"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="block">Priority</FormLabel>
            <FormControl>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="justify-between w-full">
                    {field.value}
                    <IoIosArrowDown size={12} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem onSelect={() => field.onChange("Low")}>
                    Low
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => field.onChange("Medium")}>
                    Medium
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => field.onChange("High")}>
                    High
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="block">Type</FormLabel>
            <FormControl>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="justify-between w-full">
                    {field.value}
                    <IoIosArrowDown size={12} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem onSelect={() => field.onChange("Feature")}>
                    Feature
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => field.onChange("Bug")}>
                    Bug
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => field.onChange("Task")}>
                    Task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
