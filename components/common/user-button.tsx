"use client";

import { FaUser } from "react-icons/fa";
import { GrServer, GrUserAdmin } from "react-icons/gr";
import { IoMdExit } from "react-icons/io";
import { PiDevices } from "react-icons/pi";

import { LogoutButton, MenuItemButton } from "@/components/common/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";

type UserButtonProps = {
  isPublic?: boolean;
};

export const UserButton = ({ isPublic }: UserButtonProps) => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-blue-400 cursor-pointer">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="[&_*]:cursor-pointer w-40" align="end">
        <MenuItemButton href="/admin">
          <DropdownMenuItem>
            <GrUserAdmin className="h-4 w-4 mr-2" />
            Go to admin
          </DropdownMenuItem>
        </MenuItemButton>
        <MenuItemButton href="/client">
          <DropdownMenuItem>
            <PiDevices className="h-4 w-4 mr-2" />
            Go to client
          </DropdownMenuItem>
        </MenuItemButton>
        <MenuItemButton href="/server">
          <DropdownMenuItem>
            <GrServer className="h-4 w-4 mr-2" />
            Go to server
          </DropdownMenuItem>
        </MenuItemButton>
        <LogoutButton reload={isPublic}>
          <DropdownMenuItem>
            <IoMdExit className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
