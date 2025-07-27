"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/primitives/avatar";
import { useSession } from "./providers/session-provider";

export const UserAvatar = () => {
  const { user } = useSession();
  return (
    <Avatar className="rounded-lg w-8 h-8">
      <AvatarImage
        src={
          user?.avatarUrl ? user.avatarUrl : "/images/avatar-placeholder.png"
        }
        alt="Avatar"
      />
      <AvatarFallback className="rounded-lg">Av</AvatarFallback>
    </Avatar>
  );
};
