'use server';

import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export const createVideo = async (formData: FormData) => {
    const title = formData.get('title') as string | null;
    const description = formData.get('description') as string | null;
    const videoUrl = formData.get('videoUrl') as string | null;
    const thumbnail = formData.get('thumbnail') as string | null;
    const userId = formData.get('userId') as string | null;
    const pinataId = formData.get('pinataId') as string | null;

    if (!title || !videoUrl || !userId || !pinataId) {
        throw new Error('Thiếu trường bắt buộc');
    }

    const data: Prisma.VideoUncheckedCreateInput = { title, videoUrl, userId, pinataId };
    if (description) data.description = description;
    if (thumbnail) data.thumbnail = thumbnail;

    return await prisma.video.create({ data });
};

/**
 * Lấy danh sách video của user đang đăng nhập (có phân trang)
 * @param userId string
 * @param page number (mặc định 1)
 * @param limit number (mặc định 10)
 */
export const getUserVideos = async (userId: string, page = 1, limit = 10) => {
    if (!userId) throw new Error('Thiếu userId');
    const skip = (page - 1) * limit;
    const [videos, total] = await Promise.all([
        prisma.video.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
        prisma.video.count({ where: { userId } })
    ]);
    return { videos, total, page, limit };
};

/**
 * Xóa video theo id và userId (chỉ cho phép xóa video của chính mình)
 * @param id string
 * @param userId string
 */
export const deleteVideo = async (pinataId: string, userId: string) => {
    if (!pinataId || !userId) throw new Error('Thiếu id hoặc userId');
    // Đảm bảo chỉ xóa video của chính mình
    return await prisma.video.deleteMany({ where: { pinataId, userId } });
};

/**
 * Lấy tất cả video (có phân trang) cho trang khám phá
 * @param page number (mặc định 1)
 * @param limit number (mặc định 10)
 */
export const getAllVideos = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [videos, total] = await Promise.all([
        prisma.video.findMany({
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
        prisma.video.count()
    ]);
    return { videos, total, page, limit };
};
