"use server";

import { UserRole } from "@prisma/client";

import { currentRole } from "@/lib/auth";

export const admin = async () => {
  const role = await currentRole();
  if (role === UserRole.USER) {
    return { error: "Forbidden Admin Action!" };
  }
  return { success: "Allowed Admin Action!" };
};

export const getExampleData = async (ms = 2000) => {
  return new Promise((resolver) => setTimeout(resolver, ms));
};
