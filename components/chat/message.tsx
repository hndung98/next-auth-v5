"use client";

import clsx from "clsx";
import { RxAvatar } from "react-icons/rx";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Message = ({
  username,
  message,
  avatar,
  isOwner,
  createAt,
}: {
  username: string;
  message: string;
  avatar?: string;
  isOwner?: boolean;
  createAt?: string;
}) => {
  if (isOwner)
    return (
      <div className="mb-2 gap-1 flex items-center justify-end">
        <span className="px-2 h-fit rounded-sm cursor-pointer hover:bg-gray-600">
          &#8942;
        </span>
        <span className="py-1 px-2 inline-block max-w-[90%] rounded-md bg-gray-200 dark:bg-gray-600">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-end whitespace-pre-line">
                {message}
              </TooltipTrigger>
              <TooltipContent>
                <p>{"You, " + (createAt ?? "")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      </div>
    );
  return (
    <div className="mb-1 gap-1">
      <span className="w-fit flex items-center py-1 px-1 gap-x-1">
        {!avatar && username ? (
          <span className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <RxAvatar className="w-6 h-6 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{username}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        ) : (
          <span className="w-6 h-6"></span>
        )}
        <span
          className={clsx(
            "py-1 px-1 max-w-[80%] inline-block rounded-md bg-gray-200 dark:bg-gray-600"
          )}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-start whitespace-pre-line">
                {message}
              </TooltipTrigger>
              <TooltipContent>
                <p>{createAt ?? ""}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
        <span className="px-2 rounded-sm cursor-pointer hover:bg-gray-600">
          &#8942;
        </span>
      </span>
    </div>
  );
};
