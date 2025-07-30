import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/primitives/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { NotificationsButton } from "@/features/notifications/components/notifcation-button";
import { FolderKanban } from "lucide-react";
import { LuChevronsUpDown } from "react-icons/lu";

export const Navbar = () => {
  return (
    <header>
      <nav className="flex justify-between items-center px-2 sm:px-6 py-5 border-b w-full h-12 text-sm">
        <div className="flex items-center gap-3">
          <div>
            <FolderKanban className="size-5" />
          </div>
          <div className="text-muted-foreground">/</div>
          <div className="flex items-center gap-1">
            <div>ProjectFlow</div>
            <LuChevronsUpDown size={14} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <NotificationsButton />
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <UserAvatar />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};
