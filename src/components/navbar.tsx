import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/primitives/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { logout } from "@/features/auth/actions/logout";
import { NotificationsButton } from "@/features/notifications/components/notifcation-button";
import { FolderKanban } from "lucide-react";
import Link from "next/link";
import { LuChevronsUpDown } from "react-icons/lu";

const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <UserAvatar />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Navbar = () => {
  return (
    <header>
      <nav className="flex justify-between items-center px-2 sm:px-6 py-5 border-b w-full h-12 text-sm">
        <div className="flex items-center gap-3">
          <Link href="/projects">
            <FolderKanban className="size-5" />
          </Link>
          <div className="text-muted-foreground">/</div>
          <div className="flex items-center gap-1">
            <div>ProjectFlow</div>
            <LuChevronsUpDown size={14} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <NotificationsButton />
          <ThemeToggle />
          <UserMenu />
        </div>
      </nav>
    </header>
  );
};
