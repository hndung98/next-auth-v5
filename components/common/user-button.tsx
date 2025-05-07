"use client";

import { FaUser } from "react-icons/fa";
import { GrServer, GrUserAdmin } from "react-icons/gr";
import { IoMdExit } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { PiDevices } from "react-icons/pi";

import { LogoutButton, MenuItemButton } from "@/components/common/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";

const menuItems = [
  { name: "Home", href: "/dashboard", icon: GrUserAdmin },
  { name: "Client (En)", href: "/en/client", icon: PiDevices },
  { name: "Client (Vi)", href: "/vi/client", icon: PiDevices },
  { name: "Server (En)", href: "/en/server", icon: GrServer },
  { name: "Server (Vi)", href: "/vi/server", icon: GrServer },
  { name: "Settings", href: "/dashboard/settings", icon: IoSettingsOutline },
];

type UserButtonProps = {
  isPublic?: boolean;
};

export const UserButton = ({ isPublic }: UserButtonProps) => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer bg-blue-400 dark:bg-gray-800"
        >
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="cursor-pointer bg-blue-400 dark:bg-gray-800">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="[&_*]:cursor-pointer w-40" align="end">
        {menuItems.map((item, index) => {
          const LinkIcon = item.icon;
          return (
            <MenuItemButton
              key={"menu-item-on-user-button-" + index}
              href={item.href}
            >
              <DropdownMenuItem>
                <LinkIcon className="h-4 w-4 mr-2" />
                {item.name}
              </DropdownMenuItem>
            </MenuItemButton>
          );
        })}
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
