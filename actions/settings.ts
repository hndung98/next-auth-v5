"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";

import { unstable_update } from "@/auth";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SettingsSchema } from "@/schemas";

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

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email != user.email) {
    // TODO: verify email
    // generate varification token
    // send it to email
    // confirm
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordsMatch) {
      return { error: "Invalid password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await prisma.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  unstable_update({
    user: {
      name: updatedUser.name,
      role: updatedUser.role,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
    },
  });

  return { success: "Settings updated!" };
};
