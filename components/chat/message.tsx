"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

export const Message = ({
  username,
  message,
  avatar,
  userId,
}: {
  username: string;
  message: string;
  avatar?: string;
  userId?: string;
}) => {
  const user = useCurrentUser();
  if (userId === user?.id)
    return <div className="mb-1 text-end">{message}</div>;
  return (
    <div className="mb-1">
      {avatar && <span>Img</span>}
      <span className="font-bold">{username}: </span>
      {message}
    </div>
  );
};
