"use server";

import { z } from "zod";

import { getUserById } from "@/data/user";
import { SettingsSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const validatedFields = SettingsSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Something went wrong!" };
  }
  const user = await currentUser();
  if (!user?.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser?.id) {
    return { error: "Unauthorized!" };
  }

  await prisma.user.update({ where: { id: dbUser.id }, data: { ...values } });

  return { success: "Settings updated!" };
};
