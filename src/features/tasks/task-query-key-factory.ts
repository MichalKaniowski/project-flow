export const taskQueryKeys = {
  getTasks: (projectId: string) => ["project-tasks", projectId],
  getTags: (projectId: string) => ["project-tags", projectId],
  getStatuses: (projectId: string) => ["project-statuses", projectId],
};
