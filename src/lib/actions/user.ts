"use server";

import { prisma } from "@/lib/db";

/**
 * Lấy thông tin user hiện tại từ session và database
 */
export const getCurrentUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}; 