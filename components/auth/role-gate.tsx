"use client";

import { FormError } from "@/components/form-error";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

type RoleGateProps = {
  children: React.ReactNode;
  allowedRole?: UserRole;
};

export const RoleGateInfo = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  if (allowedRole && role !== allowedRole)
    return (
      <FormError message="This action is only available to admin users." />
    );
  return <>{children}</>;
};
