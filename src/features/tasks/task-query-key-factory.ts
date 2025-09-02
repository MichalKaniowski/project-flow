export const taskQueryKeys = {
  getColumns: (projectId: string) => ["project-columns", projectId],
  getTags: (projectId: string) => ["project-tags", projectId],
  getStatuses: (projectId: string) => ["project-statuses", projectId],
};
