"use client";

import { admin } from "@/actions/admin";
import { RoleGateInfo } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

export default function Page() {
  const role = useCurrentRole();
  const onApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Allowed API Route!");
      } else {
        toast.error("Forbidden API Route!");
      }
    });
  };
  const onApiActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };
  return (
    <Card>
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin Page</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGateInfo allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are admin." />
        </RoleGateInfo>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 font-medium">
          <p className="text-sm font-medium">Admin-only Route</p>
          <Button onClick={onApiRouteClick}>Test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 font-medium">
          <p className="text-sm font-medium">Admin-only Action</p>
          <Button onClick={onApiActionClick}>Test</Button>
        </div>
      </CardContent>
    </Card>
  );
}
