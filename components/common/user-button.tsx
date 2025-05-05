"use client";

import { FaUser } from "react-icons/fa";
import { GrServer, GrUserAdmin } from "react-icons/gr";
import { IoMdExit } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
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
        <MenuItemButton href="/dashboard">
          <DropdownMenuItem>
            <GrUserAdmin className="h-4 w-4 mr-2" />
            Dashboard
          </DropdownMenuItem>
        </MenuItemButton>
        <MenuItemButton href="/en/client">
          <DropdownMenuItem>
            <PiDevices className="h-4 w-4 mr-2" />
            Client (En)
          </DropdownMenuItem>
        </MenuItemButton>
        <MenuItemButton href="/vi/client">
          <DropdownMenuItem>
            <PiDevices className="h-4 w-4 mr-2" />
            Client (Vi)
          </DropdownMenuItem>
        </MenuItemButton>
        <MenuItemButton href="/en/server">
          <DropdownMenuItem>
            <GrServer className="h-4 w-4 mr-2" />
            Server (En)
          </DropdownMenuItem>
        </MenuItemButton>
        <MenuItemButton href="/vi/server">
          <DropdownMenuItem>
            <GrServer className="h-4 w-4 mr-2" />
            Server (Vi)
          </DropdownMenuItem>
        </MenuItemButton>
        <MenuItemButton href="/dashboard/settings">
          <DropdownMenuItem>
            <IoSettingsOutline className="h-4 w-4 mr-2" />
            Settings
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
