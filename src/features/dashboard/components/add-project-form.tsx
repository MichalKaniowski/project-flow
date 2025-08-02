"use client";

import { RequiredFieldMarker } from "@/components/required-field-marker";
import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { Label } from "@/components/ui/primitives/label";
import { createProject } from "@/features/dashboard/actions/create-project";
import {
  createProjectSchema,
  CreateProjectValues,
} from "@/features/dashboard/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddProjectForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectValues>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      abstract: "",
      targetUser: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (values: CreateProjectValues) => {
    const data = await createProject(values);
    if (data?.error || !data?.createdProject) {
      toast.error(data.error);
      return;
    }

    toast.success("Project added successfully");
    router.push(`/projects/${data.createdProject.id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3">
        <div>
          <Label htmlFor="name">Name</Label>
          <RequiredFieldMarker />
          <Input
            id="name"
            className={`mt-2 ${errors.name ? "border-red-500" : ""}`}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="abstract">Abstract</Label>
          <RequiredFieldMarker />
          <Input
            id="abstract"
            className={`mt-2 ${errors.abstract ? "border-red-500" : ""}`}
            {...register("abstract")}
          />
          {errors.abstract && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.abstract.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="targetUser">Target user</Label>
          <RequiredFieldMarker />
          <Input
            id="targetUser"
            className={`mt-2 ${errors.targetUser ? "border-red-500" : ""}`}
            {...register("targetUser")}
          />
          {errors.targetUser && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.targetUser.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end items-center">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Project"}
        </Button>
      </div>
    </form>
  );
}
