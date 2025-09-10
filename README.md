# ProjectFlow

## Description

ProjectFlow is a streamlined project management tool designed specifically for startups and small companies. Unlike many other solutions, ProjectFlow focuses on delivering essential features without the bloat, ensuring a smooth and efficient user experience.

## Features

- Auth: login, signup, reset password
- Projects: search, create, delete, pin
- Tasks: create, edit, delete, duplicate, tags
- Theme: dark and light mode

## Features to be added

- Projects: settings
- Tasks: searching by text, filtering by status, assigned etc.
- Columns: add, delete, reorder
- Other full featues: plan, notifications, permissions, roadmap, integrations, messages, finances, other...

## Getting Started

### 1. Add .env file with these variables:

```
NEXT_PUBLIC_BASE_URL
DATABASE_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
RESEND_API_KEY
```

### 2. Install dependencies:

Run `npm install` or `yarn install` or `pnpm install`

### 3. Run the development server:

Run `npm run dev` or `yarn dev` or `pnpm dev`

### 4. Your project is ready and running at NEXT_PUBLIC_BASE_URL

## Coding Guidelines

- This project is built on featues architecture. Every features has it's own folders like components, actions, hooks, etc.

- This project uses tanstack query and hooks like useQuery and useMutation for all it's state managment.

- Auth is always checked when accessing data, it's also checked in e.g. layout but only for convenience.

- Sometimes useQuery is used for state managment purposes and NOT fetching data. Then initialData is set to server data and staleTime is set to infinity so data is never fetched, and is changed by mutating the query data. It happens when data is fetched server side and passed into useQuery, example:

```typescript
const {
  data: { columnsWithTasks },
} = useQuery({
  queryKey: taskQueryKeys.getColumns(projectId),
  queryFn: () =>
    kyInstance
      .get("/api/projects/${projectId}/columns-with-tasks")
      .json<ColumnsWithTasksInfo>(),
  initialData: {
    columnsWithTasks: getColumnsWithTasks(initialTasks, projectStatuses),
  },
  staleTime: Infinity,
});
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details
