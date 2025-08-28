import { Prisma } from "./generated/prisma";

export const taskDataInclude = {
  status: true,
  tags: true,
};
export type TaskData = Prisma.TaskGetPayload<{
  include: typeof taskDataInclude;
}>;

export const projectDataInclude = {
  tasks: {
    include: taskDataInclude,
  },
  tags: true,
  statuses: true,
};
export type ProjectData = Prisma.ProjectGetPayload<{
  include: typeof projectDataInclude;
}>;
