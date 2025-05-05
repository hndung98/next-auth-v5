import { i18n } from "i18next";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExtendedUser } from "@/types/next-auth";
import { fallbackLng } from "@/app/i18n/settings";

type UserInfoProps = {
  user?: ExtendedUser;
  label: string;
  i18n: i18n;
  lng?: string;
};

export const UserInfo = ({
  i18n,
  lng = fallbackLng,
  user,
  label,
}: UserInfoProps) => {
  const t = i18n.getFixedT(lng, "translation");
  return (
    <Card className="w-full flex flex-col justify-start items-center my-dark-style">
      <CardHeader className="w-full">
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4 w-full">
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-lg font-medium">{t("word.id")}</p>
          <p className="truncate text-xs font-mono bg-slate-100 rounded-md my-dark-style">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">{t("word.name")}</p>
          <p className="truncate text-xs font-mono bg-slate-100 rounded-md my-dark-style">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">{t("word.email")}</p>
          <p className="truncate text-xs font-mono bg-slate-100 rounded-md my-dark-style">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">{t("word.role")}</p>
          <p className="truncate text-xs font-mono bg-slate-100 rounded-md my-dark-style">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">{t("word.two_factor_auth")}</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
