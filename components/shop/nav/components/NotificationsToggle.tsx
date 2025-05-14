"use client";

import { MdOutlineErrorOutline, MdOutlineNotifications } from "react-icons/md";
import { PiInfo, PiWarning } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type NotificationsType = {
  id: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
};

export function NotificationsToggle({
  notifications,
}: {
  notifications: NotificationsType[];
}) {
  const itemCount = 3;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative cursor-pointer bg-transparent"
        >
          <MdOutlineNotifications className="w-7 h-7 cursor-pointer" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {notifications.map((notification, index) => (
          <DropdownMenuItem key={`notification-${index}`} onClick={() => {}}>
            <div className="flex items-center">
              <div className="flex flex-col">
                <h4 className="text-sm md:text-xl">{notification.message}</h4>
                <p className="text-start text-xs md:text-sm">
                  {notification.createdAt}
                </p>
              </div>
            </div>
            <DropdownMenuShortcut>
              {notification.type === "info" ? (
                <PiInfo className="text-green-700" />
              ) : notification.type === "warning" ? (
                <PiWarning className="text-yellow-500" />
              ) : (
                <MdOutlineErrorOutline className="text-red-600" />
              )}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
