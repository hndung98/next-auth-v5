import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export function withAdminOnly<TArgs extends any[], TResult>(
  handler: (...args: TArgs) => Promise<TResult>
): (...args: TArgs) => Promise<TResult | { error: string }> {
  return async (...args: TArgs) => {
    const role = await currentRole();
    if (role !== UserRole.ADMIN) {
      return { error: "Forbidden action." };
    }
    return handler(...args);
  };
}
