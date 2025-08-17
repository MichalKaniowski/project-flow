"use client";

import { Button } from "@/components/ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/primitives/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/primitives/form";
import { Input } from "@/components/ui/primitives/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/primitives/sheet";
import { Textarea } from "@/components/ui/primitives/textarea";
import { useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "sonner";
import { createTask } from "../actions/create-task";
import { AddTaskValues } from "../validation";

export const AddTaskSheet = ({ projectId }: { projectId: string }) => {
  const form = useForm<AddTaskValues>({
    defaultValues: {
      title: "",
      assignee: "John Doe",
      targetDate: new Date(),
      status: "Backlog",
      priority: "Medium",
      type: "Feature",
      description: "",
    },
  });

  const handleAddTask = async (values: AddTaskValues) => {
    const { error } = await createTask(values, projectId);
    form.reset();
    if (error) toast.error(error);
    else {
      toast.success("Task added successfully");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add Task</Button>
      </SheetTrigger>
      <SheetContent className="min-w-full sm:min-w-[450px]">
        <SheetHeader className="mb-4">
          <SheetTitle>Add Task</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddTask)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Add login feature" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block">Assignee</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="justify-between w-full"
                        >
                          {field.value}
                          <IoIosArrowDown size={12} className="ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        <DropdownMenuItem
                          onSelect={() => field.onChange("John Doe")}
                        >
                          John Doe
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => field.onChange("Bob Smith")}
                        >
                          Bob Smith
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
              name="targetDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* status, priority, type dropdowns */}
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Status</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="justify-between w-full"
                          >
                            {field.value}
                            <IoIosArrowDown size={12} className="ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                          <DropdownMenuItem
                            onSelect={() => field.onChange("Backlog")}
                          >
                            Backlog
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => field.onChange("In Progress")}
                          >
                            In Progress
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => field.onChange("In Review")}
                          >
                            In Review
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => field.onChange("Done")}
                          >
                            Done
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
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Priority</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="justify-between w-full"
                          >
                            {field.value}
                            <IoIosArrowDown size={12} className="ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                          <DropdownMenuItem
                            onSelect={() => field.onChange("Low")}
                          >
                            Low
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => field.onChange("Medium")}
                          >
                            Medium
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => field.onChange("High")}
                          >
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
                          <Button
                            variant="outline"
                            className="justify-between w-full"
                          >
                            {field.value}
                            <IoIosArrowDown size={12} className="ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                          <DropdownMenuItem
                            onSelect={() => field.onChange("Feature")}
                          >
                            Feature
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => field.onChange("Bug")}
                          >
                            Bug
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => field.onChange("Task")}
                          >
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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Add login, signup and oauth functionalities."
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center">
              <SheetClose asChild>
                <Button type="submit">Create</Button>
              </SheetClose>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
