import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export function withAdminOnly<TArgs extends any[], TResult>(
  handler: (...args: TArgs) => Promise<TResult>
): (
  ...args: TArgs
) => Promise<TResult | { message?: string | null; errors?: any | null }> {
  return async (...args: TArgs) => {
    const role = await currentRole();
    if (role !== UserRole.ADMIN) {
      return { message: "Forbidden action." };
    }
    return handler(...args);
  };
}
