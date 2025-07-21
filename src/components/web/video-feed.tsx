"use client";

import React, { useState, useCallback, useEffect } from "react";
import VideoCard from "./video-card";
import { getAllVideosWithDetails } from "@/lib/actions/video";
import { useSession } from "next-auth/react";
import { FixedSizeList as List, ListOnItemsRenderedProps } from "react-window";

interface Video {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  thumbnail: string | null;
  userId: string;
  pinataId: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

const PAGE_SIZE = 10;

const VideoFeed: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  
  const { data: session } = useSession();
  const userId = session?.user?.id || null;

  // Load videos từ database (phân trang)
  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const result = await getAllVideosWithDetails(1, PAGE_SIZE, userId);
        setVideos(result.videos);
        setHasMore(result.videos.length < result.total);
        setError(null);
      } catch (err) {
        setError('Không thể tải video. Vui lòng thử lại.');
        console.error('Error loading videos:', err);
      } finally {
        setLoading(false);
      }
    };
    loadVideos();
  }, [userId]);

  // Infinite scroll: fetch more videos khi gần cuối
  const fetchMoreVideos = useCallback(async () => {
    if (isFetchingMore || !hasMore) return;
    setIsFetchingMore(true);
    try {
      const nextPage = page + 1;
      const result = await getAllVideosWithDetails(nextPage, PAGE_SIZE, userId);
      setVideos((prev) => [...prev, ...result.videos]);
      setPage(nextPage);
      setHasMore((nextPage * PAGE_SIZE) < result.total);
    } catch (err) {
      setError('Không thể tải thêm video.');
      console.error('Error loading more videos:', err);
    } finally {
      setIsFetchingMore(false);
    }
  }, [isFetchingMore, hasMore, page, userId]);

  // Cập nhật playingIndex khi scroll (dựa vào virtual list visible index)
  const handleItemsRendered = useCallback((props: ListOnItemsRenderedProps) => {
    const { visibleStartIndex, visibleStopIndex } = props;
    // Lấy index ở giữa viewport (ưu tiên visibleStartIndex nếu chỉ có 1 item visible)
    const centerIndex = Math.floor((visibleStartIndex + visibleStopIndex) / 2);
    if (centerIndex !== playingIndex) {
      setPlayingIndex(centerIndex);
      setIsPaused(false);
    }
    // Infinite scroll: nếu gần cuối thì fetch thêm
    if (hasMore && visibleStopIndex >= videos.length - 3 && !isFetchingMore) {
      fetchMoreVideos();
    }
  }, [videos.length, hasMore, isFetchingMore, fetchMoreVideos, playingIndex]);

  // Khi user bấm mute, cập nhật muted cho toàn bộ feed
  const handleMuteChange = useCallback((value: boolean) => {
    setMuted(value);
  }, []);

  // Xử lý play/pause khi click overlay hoặc nút play/pause
  const handlePlayToggle = useCallback((idx: number) => {
    if (idx === playingIndex) {
      setIsPaused((prev) => !prev);
    } else {
      setPlayingIndex(idx);
      setIsPaused(false);
    }
  }, [playingIndex]);

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-foreground dark:text-white text-lg">Đang tải video...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-foreground dark:text-white text-lg text-center">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // No videos state
  if (videos.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-white text-lg text-center">
          <p>Chưa có video nào</p>
          <p className="text-sm text-gray-400 mt-2">Hãy đăng video đầu tiên!</p>
        </div>
      </div>
    );
  }

  // Item renderer cho react-window
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style} className="snap-center p-0 sm:p-[1em] h-screen flex items-center justify-center">
      <VideoCard
        video={videos[index]}
        playing={playingIndex === index && !isPaused}
        muted={muted}
        onMuteChange={handleMuteChange}
        onPlayToggle={() => handlePlayToggle(index)}
      />
    </div>
  );

  return (
    <div className="h-screen">
      <List
        height={window.innerHeight}
        itemCount={videos.length}
        itemSize={window.innerHeight}
        width={"100%"}
        onItemsRendered={handleItemsRendered}
        className="snap-y snap-mandatory"
      >
        {Row}
      </List>
      {isFetchingMore && (
        <div className="w-full flex justify-center py-4 text-white">Đang tải thêm...</div>
      )}
    </div>
  );
};

export default VideoFeed;