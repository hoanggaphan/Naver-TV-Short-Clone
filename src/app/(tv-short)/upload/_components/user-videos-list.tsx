"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { VideoIcon } from "lucide-react";
import { getUserVideos, getUserVideosCount } from "@/lib/actions/video";
import DeleteVideoButton from "./user-video-delete-button";
import { useEffect, useRef, useState, useCallback, RefObject } from "react";
import { useSession } from "next-auth/react";

export interface RenderVideo {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  thumbnail: string | null;
  pinataId: string;
  createdAt: string;
  updatedAt: string;
}

interface UserVideosListProps {
  addVideoRef?: RefObject<((video: RenderVideo) => void) | null>;
}

const PAGE_SIZE = 10;

export default function UserVideosList({ addVideoRef }: UserVideosListProps) {
  const { data: session, status } = useSession();
  const [videos, setVideos] = useState<RenderVideo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const userId = session?.user && typeof session.user.id === "string" ? session.user.id : null;

  // Hàm thêm video mới vào đầu danh sách
  const addVideoNew = (video: RenderVideo) => {
    setVideos((prev) => {
      if (prev.some(v => v.id === video.id)) return prev;
      return [video, ...prev];
    });
    setTotal((t) => (typeof t === 'number' ? t + 1 : t));
  };

  // Hàm xóa video khỏi danh sách
  const handleDeleteVideo = (pinataId: string) => {
    setVideos((prev) => prev.filter(v => v.pinataId !== pinataId));
    setTotal((t) => (typeof t === 'number' && t > 0 ? t - 1 : t));
  };

  // Gán hàm cho ref để parent gọi được
  useEffect(() => {
    if (addVideoRef) {
      addVideoRef.current = addVideoNew;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addVideoRef]);

  // Fetch tổng số video
  useEffect(() => {
    if (!userId) return;
    getUserVideosCount(userId)
      .then(setTotal)
      .catch(() => setTotal(null));
  }, [userId]);

  // Fetch video theo page
  const fetchVideos = useCallback(async () => {
    if (!userId || loading || !hasMore) return;
    setLoading(true);
    try {
      const result = await getUserVideos(userId, page, PAGE_SIZE);
      const newVideos = (result.videos as Array<{
        id: string;
        title: string;
        description: string | null;
        videoUrl: string;
        thumbnail: string | null;
        pinataId: string;
        createdAt: Date | string;
        updatedAt: Date | string;
      }>).map((v) => ({
        ...v,
        createdAt: typeof v.createdAt === "string" ? v.createdAt : v.createdAt instanceof Date ? v.createdAt.toISOString() : "",
        updatedAt: typeof v.updatedAt === "string" ? v.updatedAt : v.updatedAt instanceof Date ? v.updatedAt.toISOString() : "",
      }));
      setVideos((prev) => {
        // Loại bỏ video trùng id
        const ids = new Set(prev.map(v => v.id));
        const merged = [...prev];
        for (const v of newVideos) {
          if (!ids.has(v.id)) {
            merged.push(v);
            ids.add(v.id);
          }
        }
        return merged;
      });
      setHasMore(newVideos.length === PAGE_SIZE);
    } catch {
      setError("Không thể tải danh sách video");
    } finally {
      setLoading(false);
    }
  }, [userId, page, loading, hasMore]);

  // Gọi fetchVideos khi page thay đổi
  useEffect(() => {
    if (!userId) return;
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, userId]);

  // Intersection Observer để load thêm video
  useEffect(() => {
    if (!hasMore || loading) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMore, loading]);

  if (status === "loading" || !userId) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Video của bạn
        {typeof total === "number" && (
          <span className="ml-2 text-base text-muted-foreground">({total})</span>
        )}
      </h2>
      <div className="grid gap-4 max-h-[70vh] overflow-y-auto rounded-lg shadow-inner bg-background/80 p-4">
        {videos.length === 0 && !loading && (
          <div className="text-center py-8 text-muted-foreground">
            <VideoIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Bạn chưa có video nào</p>
          </div>
        )}
        {videos.map((video) => (
          <div
            key={video.id}
            className="border rounded-lg p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors shadow-sm relative group"
          >
            {/* Video thumbnail/preview */}
            <div className="flex-shrink-0">
              <div className="w-32 h-20 bg-muted rounded-lg overflow-hidden relative">
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover"
                  muted
                  preload="metadata"
                  poster={video.thumbnail || undefined}
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            {/* Video info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm mb-1 truncate">{video.title}</h3>
              {video.description && (
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {video.description}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {formatDate(video.createdAt)}
              </p>
            </div>
            {/* Actions */}
            <div className="flex-shrink-0">
              <DeleteVideoButton pinataId={video.pinataId} title={video.title} userId={userId} onVideoDeleted={handleDeleteVideo} />
            </div>
          </div>
        ))}
        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="animate-pulse flex items-start gap-4 p-4 border rounded-lg">
                <div className="w-32 h-20 bg-muted rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-1/3" />
                  <div className="h-3 bg-muted rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Sentinel for infinite scroll */}
        <div ref={observerRef} />
        {/* End message */}
        {!hasMore && videos.length > 0 && (
          <div className="text-center text-xs text-muted-foreground py-4">Đã tải hết video</div>
        )}
      </div>
    </div>
  );
}