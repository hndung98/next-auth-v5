"use client";

import { FaUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { User } from "next-auth";

import { LogoutButton, MenuItemButton } from "@/components/common/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { name: "Profile", href: "/shop/profile", icon: FaRegUserCircle },
];

type UserToggleProps = {
  user?: User;
};

export const UserToggle = ({ user }: UserToggleProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer border-0 bg-transparent dark:border-0 dark:bg-transparent"
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
        <DropdownMenuSeparator />
        <LogoutButton reload={true}>
          <DropdownMenuItem>
            <IoMdExit className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
