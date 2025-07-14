"use client";

import { Heart, MessageCircle, Play, Share2, Volume2, VolumeX } from "lucide-react";
import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

interface VideoCardProps {
  src: string;
  playing: boolean;
  muted: boolean;
  onVisible: () => void;
  onMuteChange: (value: boolean) => void;
  onPlayToggle: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ src, playing, muted, onVisible, onMuteChange, onPlayToggle }) => {
  const ref = useRef<HTMLDivElement>(null);

  // IntersectionObserver để báo cha khi vào viewport
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          onVisible();
        }
      },
      { threshold: [0.6] }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <div ref={ref} className="relative aspect-[0.5625] bg-black rounded-xl overflow-hidden min-w-[320px] min-h-[568px] h-full group">
      <ReactPlayer
        src={src}
        playing={playing}
        muted={muted}
        loop
        width="100%"
        height="100%"
        controls={false}
        style={{ background: "black" }}
      />

      {/* Icon Play lớn khi pause */}
      {!playing && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <Play className="text-white/80 w-24 h-24 drop-shadow-lg" />
        </div>
      )}

      {/* Overlay controls (z-20) */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pointer-events-none">
        {/* Bottom: Caption, all controls */}
        <div className="flex items-end justify-between p-4 bg-[linear-gradient(rgba(0,0,0,0)_0%,rgba(0,0,0,0)_12%,rgba(0,0,0,0.01)_21%,rgba(0,0,0,0.02)_29%,rgba(0,0,0,0.03)_35%,rgba(0,0,0,0.04)_40%,rgba(0,0,0,0.06)_45%,rgba(0,0,0,0.08)_48%,rgba(0,0,0,0.1)_52%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.14)_60%,rgba(0,0,0,0.16)_65%,rgba(0,0,0,0.18)_71%,rgba(0,0,0,0.2)_79%,rgba(0,0,0,0.22)_88%,rgba(0,0,0,0.24)_100%)]">
          <div className="text-white select-text pointer-events-auto">
            <button className="font-bold underline pointer-events-auto" tabIndex={0} onClick={() => alert('Go to user profile!')}>
              @username
            </button>
            <div className="mt-1 select-text pointer-events-auto">
              Caption video siêu hay #hashtag
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end pointer-events-auto">
            <button className="bg-white/20 rounded-full p-2">
              <Heart className="text-white" />
            </button>
            <button className="bg-white/20 rounded-full p-2">
              <MessageCircle className="text-white" />
            </button>
            <button className="bg-white/20 rounded-full p-2">
              <Share2 className="text-white" />
            </button>
            
            <button
              className="bg-white/20 rounded-full p-2"
              onClick={() => onMuteChange(!muted)}
            >
              {muted ? <VolumeX className="text-white" /> : <Volume2 className="text-white" />}
            </button>
          </div>
        </div>
      </div>
      {/* Overlay click to play/pause (z-10) */}
      <div
        className="absolute inset-0 z-10 cursor-pointer pointer-events-auto"
        aria-label="Toggle play/pause"
        onClick={onPlayToggle}
      />
    </div>
  );
};

export default VideoCard; 