'use server';

import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export const createVideo = async (formData: FormData) => {
    const title = formData.get('title') as string | null;
    const description = formData.get('description') as string | null;
    const videoUrl = formData.get('videoUrl') as string | null;
    const thumbnail = formData.get('thumbnail') as string | null;
    const userId = formData.get('userId') as string | null;

    if (!title || !videoUrl || !userId) {
        throw new Error('Thiếu trường bắt buộc');
    }

    // Tạo object data chỉ chứa trường có giá trị
    const data: Prisma.VideoUncheckedCreateInput = { title, videoUrl, userId };
    if (description) data.description = description;
    if (thumbnail) data.thumbnail = thumbnail;

    return await prisma.video.create({ data });
};
