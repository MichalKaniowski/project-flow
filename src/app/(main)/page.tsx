import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/primitives/button";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/primitives/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { KanbanBoard } from "../../components/kanban-board";

export default async function ProjectManagementTool() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />

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
