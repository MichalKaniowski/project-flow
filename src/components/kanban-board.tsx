import { Badge } from "@/components/ui/primitives/badge";
import { Button } from "@/components/ui/primitives/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/primitives/dropdown-menu";
import {
  Calendar,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Plus,
} from "lucide-react";

const columns = [
  {
    id: "todo",
    title: "To Do",
    count: 4,
    tasks: [
      {
        id: "1",
        title: "Design new landing page",
        description: "Create wireframes and mockups for the new homepage",
        priority: "High",
        assignee: { name: "Alice Johnson", avatar: "AJ" },
        dueDate: "Dec 15",
        comments: 3,
        attachments: 2,
        tags: ["Design", "Frontend"],
      },
      {
        id: "2",
        title: "Set up project repository",
        description: "Initialize Git repo and set up CI/CD pipeline",
        priority: "Medium",
        assignee: { name: "Bob Smith", avatar: "BS" },
        dueDate: "Dec 12",
        comments: 1,
        attachments: 0,
        tags: ["Development", "DevOps"],
      },
      {
        id: "3",
        title: "Research competitor analysis",
        description: "Analyze top 5 competitors and their features",
        priority: "Low",
        assignee: { name: "Carol Davis", avatar: "CD" },
        dueDate: "Dec 20",
        comments: 0,
        attachments: 1,
        tags: ["Research", "Strategy"],
      },
      {
        id: "4",
        title: "Create user personas",
        description: "Develop detailed user personas based on research",
        priority: "Medium",
        assignee: { name: "David Wilson", avatar: "DW" },
        dueDate: "Dec 18",
        comments: 2,
        attachments: 0,
        tags: ["UX", "Research"],
      },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    count: 3,
    tasks: [
      {
        id: "5",
        title: "Implement authentication system",
        description: "Build login/signup functionality with JWT",
        priority: "High",
        assignee: { name: "Eve Brown", avatar: "EB" },
        dueDate: "Dec 14",
        comments: 5,
        attachments: 3,
        tags: ["Development", "Backend"],
      },
      {
        id: "6",
        title: "Design system components",
        description: "Create reusable UI components library",
        priority: "Medium",
        assignee: { name: "Frank Miller", avatar: "FM" },
        dueDate: "Dec 16",
        comments: 2,
        attachments: 1,
        tags: ["Design", "Components"],
      },
      {
        id: "7",
        title: "Database schema design",
        description: "Design and implement database structure",
        priority: "High",
        assignee: { name: "Grace Lee", avatar: "GL" },
        dueDate: "Dec 13",
        comments: 4,
        attachments: 2,
        tags: ["Database", "Backend"],
      },
    ],
  },
  {
    id: "review",
    title: "In Review",
    count: 2,
    tasks: [
      {
        id: "8",
        title: "API documentation",
        description: "Complete API documentation for all endpoints",
        priority: "Medium",
        assignee: { name: "Henry Taylor", avatar: "HT" },
        dueDate: "Dec 11",
        comments: 1,
        attachments: 1,
        tags: ["Documentation", "API"],
      },
      {
        id: "9",
        title: "Mobile responsive design",
        description: "Ensure all pages work on mobile devices",
        priority: "High",
        assignee: { name: "Ivy Chen", avatar: "IC" },
        dueDate: "Dec 17",
        comments: 3,
        attachments: 0,
        tags: ["Frontend", "Mobile"],
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    count: 5,
    tasks: [
      {
        id: "10",
        title: "Project kickoff meeting",
        description: "Initial team meeting and project planning",
        priority: "High",
        assignee: { name: "Jack Anderson", avatar: "JA" },
        dueDate: "Dec 1",
        comments: 8,
        attachments: 2,
        tags: ["Planning", "Meeting"],
      },
      {
        id: "11",
        title: "Requirements gathering",
        description: "Collect and document all project requirements",
        priority: "High",
        assignee: { name: "Kate Wilson", avatar: "KW" },
        dueDate: "Dec 3",
        comments: 6,
        attachments: 4,
        tags: ["Planning", "Documentation"],
      },
      {
        id: "12",
        title: "Technology stack selection",
        description: "Choose appropriate technologies for the project",
        priority: "Medium",
        assignee: { name: "Liam Garcia", avatar: "LG" },
        dueDate: "Dec 5",
        comments: 4,
        attachments: 1,
        tags: ["Planning", "Technology"],
      },
    ],
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-950/70 dark:border-red-800/50";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-amber-950/50 dark:text-amber-300 dark:hover:bg-amber-950/70 dark:border-amber-800/50";
    case "Low":
      return "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:hover:bg-emerald-950/70 dark:border-emerald-800/50";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800/70 dark:border-gray-700/50";
  }
};

export function KanbanBoard() {
  return (
    <div className="flex gap-6 w-full h-full overflow-x-scroll scrollbar-hide">
      {columns.map((column) => (
        <div key={column.id} className="flex flex-col min-w-80 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-gray-200">
                {column.title}
              </h3>
              <Badge variant="secondary" className="rounded-full">
                {column.count}
              </Badge>
            </div>
            <Button variant="ghost" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-col flex-1 gap-3 overflow-y-auto scrollbar-hide">
            {column.tasks.map((task) => (
              <Card
                key={task.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="font-medium text-sm leading-tight">
                      {task.title}
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 w-6 h-6"
                        >
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="mb-3 text-gray-500 dark:text-gray-400 text-xs line-clamp-2">
                    {task.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mb-3">
                    <Badge
                      className={`text-xs ${getPriorityColor(task.priority)}`}
                    >
                      {task.priority}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{task.dueDate}</span>
                      </div>
                      {task.comments > 0 && (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{task.comments}</span>
                        </div>
                      )}
                      {task.attachments > 0 && (
                        <div className="flex items-center gap-1">
                          <Paperclip className="w-3 h-3" />
                          <span>{task.attachments}</span>
                        </div>
                      )}
                    </div>

                    {/* <Avatar className="w-6 h-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback className="text-xs">
                        {task.assignee.avatar}
                      </AvatarFallback>
                    </Avatar> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
