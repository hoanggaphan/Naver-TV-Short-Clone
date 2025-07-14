"use client";

import React, { useState, useCallback } from "react";
import VideoCard from "./video-card";

const TIKTOK_VIDEO = "/video-test.mp4";

const VideoFeed: React.FC = () => {
  const [muted, setMuted] = useState(true);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {[1, 2, 3].map((item, idx) => (
        <div
          key={item}
          className="snap-center p-[1em] h-screen flex items-center justify-center"
        >
          <VideoCard
            src={TIKTOK_VIDEO}
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