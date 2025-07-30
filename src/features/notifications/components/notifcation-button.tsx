import { Button } from "@/components/ui/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/primitives/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { IoMdNotificationsOutline } from "react-icons/io";

export const NotificationsButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <IoMdNotificationsOutline className="!size-[18px]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent></DropdownMenuContent>
    </DropdownMenu>
  );
};
