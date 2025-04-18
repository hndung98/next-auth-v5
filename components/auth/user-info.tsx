import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExtendedUser } from "@/types/next-auth";

type UserInfoProps = {
  user?: ExtendedUser;
  label: string;
};

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-full flex flex-col justify-start items-center">
      <CardHeader className="w-full">
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4 w-full">
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-lg font-medium">ID</p>
          <p className="truncate text-xs font-mono bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-xs font-mono bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-xs font-mono bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-xs font-mono bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Two factor authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
