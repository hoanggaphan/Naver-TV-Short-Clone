'use server';

import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { pinata } from "../pinata";

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

    const result = await prisma.video.create({ data });

    // Revalidate upload page để refresh danh sách video
    revalidatePath('/upload');

    return result;
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
 * Lấy tổng số video của user
 * @param userId string
 */
export const getUserVideosCount = async (userId: string) => {
    if (!userId) throw new Error('Thiếu userId');
    return prisma.video.count({ where: { userId } });
};

/**
 * Xóa video theo pinataId và userId (chỉ cho phép xóa video của chính mình)
 * @param pinataId string
 * @param userId string
 */
export const deleteVideo = async (pinataId: string, userId: string) => {
    if (!pinataId || !userId) throw new Error('Thiếu pinataId hoặc userId');

    // Đảm bảo chỉ xóa video của chính mình
    const result = await prisma.video.deleteMany({
        where: { pinataId, userId }
    });

    // Revalidate upload page để refresh danh sách video
    revalidatePath('/upload');

    return result;
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

/**
 * Xóa file trên Pinata theo pinataId (server action)
 * @param pinataId string
 */
export async function deletePinataFile(pinataId: string) {
    await pinata.files.public.delete([pinataId])
}

/**
 * Toggle like/unlike video
 * @param videoId string
 * @param userId string
 */
export const toggleLike = async (videoId: string, userId: string) => {
    if (!videoId || !userId) throw new Error('Thiếu videoId hoặc userId');

    // Kiểm tra xem user đã like video này chưa
    const existingLike = await prisma.like.findUnique({
        where: {
            userId_videoId: {
                userId,
                videoId
            }
        }
    });

    if (existingLike) {
        // Nếu đã like thì unlike
        await prisma.like.delete({
            where: {
                id: existingLike.id
            }
        });
        return { liked: false };
    } else {
        // Nếu chưa like thì like
        await prisma.like.create({
            data: {
                userId,
                videoId
            }
        });
        return { liked: true };
    }
};

/**
 * Lấy thông tin like của video
 * @param videoId string
 * @param userId string | null
 */
export const getVideoLikeInfo = async (videoId: string, userId: string | null = null) => {
    if (!videoId) throw new Error('Thiếu videoId');

    const [likeCount, userLike] = await Promise.all([
        prisma.like.count({ where: { videoId } }),
        userId ? prisma.like.findUnique({
            where: {
                userId_videoId: {
                    userId,
                    videoId
                }
            }
        }) : null
    ]);

    return {
        likeCount,
        isLiked: !!userLike
    };
};

/**
 * Lấy tất cả video kèm thông tin user và like count
 * @param page number (mặc định 1)
 * @param limit number (mặc định 10)
 * @param currentUserId string | null
 */
export const getAllVideosWithDetails = async (page = 1, limit = 10, currentUserId: string | null = null) => {
    const skip = (page - 1) * limit;
    const [videos, total] = await Promise.all([
        prisma.video.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },
                likes: currentUserId ? {
                    where: { userId: currentUserId }
                } : false,
                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
        prisma.video.count()
    ]);

    // Format data để dễ sử dụng
    const formattedVideos = videos.map(video => ({
        ...video,
        likeCount: video._count.likes,
        commentCount: video._count.comments,
        isLiked: currentUserId ? video.likes.length > 0 : false,
        likes: undefined, // Remove likes array from response
        _count: undefined // Remove _count from response
    }));

    return { videos: formattedVideos, total, page, limit };
};
