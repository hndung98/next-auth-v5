"use client";

import { UserRole } from "@prisma/client";
import { toast } from "sonner";

import { admin } from "@/actions/admin";
import { RoleGateInfo } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function AdminComponentExample() {
  const onApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Success!");
      } else if (res.status === 403) {
        toast.error("Forbidden API Route.");
      } else {
        toast.error("Something went wrong...");
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

  const onSeedDataClick = () => {
    const formData = new FormData();
    formData.append("type", "create");
    fetch("/api/seed", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        toast.success("Seeded!");
      } else if (res.status === 403) {
        toast.error("Forbidden API Route!");
      } else if (res.status === 405) {
        toast.error("Method Not Allowed! (must be super admin)");
      } else if (res.status === 500) {
        toast.error("Internal Error.");
      } else {
        console.log(res);
        toast.error("Something went wrong...");
      }
    });
  };
  const onDeleteSeededDataClick = () => {
    const formData = new FormData();
    formData.append("type", "delete");
    fetch("/api/seed", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        toast.success("Deleted!");
      } else if (res.status === 403) {
        toast.error("Forbidden API Route");
      } else if (res.status === 405) {
        toast.error("Method Not Allowed! (must be super admin)");
      } else if (res.status === 500) {
        toast.error("Internal Error.");
      } else {
        toast.error("Something went wrong...");
      }
    });
  };
  return (
    <Card>
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Routes and Actions for Admins
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGateInfo allowedRole={UserRole.ADMIN}>
          <FormSuccess message="Admin privileges granted." />
        </RoleGateInfo>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 font-medium">
          <p className="text-sm font-medium">{"(Admin-only) Route X"}</p>
          <Button onClick={onApiRouteClick}>Execute</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 font-medium">
          <p className="text-sm font-medium">{"(Admin-only) Action X"}</p>
          <Button onClick={onApiActionClick}>Execute</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 font-medium">
          <p className="text-sm font-medium">
            {"(Super-admin-only) Seed data"}
          </p>
          <Button onClick={onSeedDataClick}>Execute</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 font-medium">
          <p className="text-sm font-medium">
            {"(Super-admin-only) Delete seeded data"}
          </p>
          <Button onClick={onDeleteSeededDataClick}>Execute</Button>
        </div>
      </CardContent>
    </Card>
  );
}
