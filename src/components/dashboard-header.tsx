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
import { SidebarTrigger } from "@/components/ui/primitives/sidebar";
import { Calendar, Filter, Search, Users } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export const DashboardHeader = () => {
  return (
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
  );
};
