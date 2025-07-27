import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/primitives/breadcrumb";
import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { Separator } from "@/components/ui/primitives/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/primitives/sidebar";
import { logout } from "@/features/auth/actions/logout";
import { Calendar, Filter, Search, Users } from "lucide-react";
import { AppSidebar } from "../../components/app-sidebar";
import { KanbanBoard } from "../../components/kanban-board";
import { ThemeToggle } from "../../components/theme-toggle";

export default async function ProjectManagementTool() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <button onClick={logout}>logout</button>
        <header className="flex items-center gap-2 bg-background px-4 border-b h-16 shrink-0">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Projects</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Website Redesign</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <div className="relative">
              <Search className="top-2.5 left-2 absolute w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search tasks..." className="pl-8 w-64" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Users className="mr-2 w-4 h-4" />
              Team
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 w-4 h-4" />
              Calendar
            </Button>
          </div>
        </header>

        <div className="flex flex-col flex-1">
          <div className="bg-background px-6 py-4 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-bold text-2xl tracking-tight">
                  Website Redesign
                </h1>
                <p className="text-muted-foreground">
                  Complete redesign of the company website with modern UI/UX
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">Share</Button>
                <Button>Add Task</Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <KanbanBoard />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
