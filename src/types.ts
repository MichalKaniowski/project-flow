import { Prisma, Status, Tag } from "./generated/prisma";

export interface ProjectsListInfo {
  projects: ProjectData[];
}

export interface ColumnWithTasks {
  id: string;
  name: string;
  tasks: TaskData[];
}
export interface ColumnsWithTasksInfo {
  columnsWithTasks: ColumnWithTasks[];
}

export interface TagsInfo {
  tags: Tag[];
}

export interface StatusesInfo {
  statuses: Status[];
}

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
