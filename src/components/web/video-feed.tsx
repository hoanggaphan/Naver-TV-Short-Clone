"use client";

import React, { useState, useCallback, useEffect } from "react";
import VideoCard from "./video-card";
import { getAllVideosWithDetails } from "@/lib/actions/video";
import { useSession } from "next-auth/react";

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

const VideoFeed: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const { data: session } = useSession();
  const userId = session?.user?.id || null;

  // Load videos từ database
  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        // Lấy 50 video đầu tiên với thông tin chi tiết
        const result = await getAllVideosWithDetails(1, 50, userId);
        setVideos(result.videos);
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

  // Khi video vào viewport, cập nhật playingIndex và tự động play
  const handleVisible = useCallback((index: number) => {
    if (index !== playingIndex) {
      setPlayingIndex(index);
      setIsPaused(false);
    }
  }, [playingIndex]);

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

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {videos.map((video, idx) => (
        <div
          key={video.id}
          className="snap-center p-[1em] h-screen flex items-center justify-center"
        >
          <VideoCard
            video={video}
            playing={playingIndex === idx && !isPaused}
            muted={muted}
            onVisible={() => handleVisible(idx)}
            onMuteChange={handleMuteChange}
            onPlayToggle={() => handlePlayToggle(idx)}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;