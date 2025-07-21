"use client";

import { Heart, MessageCircle, Play, Share2, Volume2, VolumeX } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import ShareModal from "./share-modal";
import { useSession } from "next-auth/react";
import LoginModal from "./login-modal";

import { toggleLike } from "@/lib/actions/video";

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

interface VideoCardProps {
  video: Video;
  playing: boolean;
  muted: boolean;
  onMuteChange: (value: boolean) => void;
  onPlayToggle: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  video, 
  playing, 
  muted, 
  onMuteChange, 
  onPlayToggle 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showShare, setShowShare] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLiked, setIsLiked] = useState(video.isLiked);
  const [likeCount, setLikeCount] = useState(video.likeCount);

  const session = useSession();
  const isAuthenticated = session?.status === "authenticated";

  // Update local state when video prop changes
  useEffect(() => {
    setIsLiked(video.isLiked);
    setLikeCount(video.likeCount);
  }, [video.isLiked, video.likeCount]);

  // Handle like
  const handleLike = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
  
    if (!session?.data?.user?.id) return;
  
    // Optimistic update
    const prevLiked = isLiked;
    const prevCount = likeCount;
  
    const nextLiked = !prevLiked;
    const nextCount = prevCount + (nextLiked ? 1 : -1);
  
    setIsLiked(nextLiked);
    setLikeCount(nextCount);
  
    try {
      const result = await toggleLike(video.id, session.data.user.id);
  
      // Sync back in case server returns something else
      setIsLiked(result.liked);
      setLikeCount(result.liked ? prevCount + 1 : prevCount - 1);
    } catch (error) {
      // Rollback if error
      setIsLiked(prevLiked);
      setLikeCount(prevCount);
      console.error('Error toggling like:', error);
    }
  };
  

  // Handle comment
  const handleComment = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    // TODO: Implement comment functionality
    alert('Comment feature coming soon!');
  };

  // Handle user profile click
  const handleUserClick = () => {
    // TODO: Navigate to user profile
    alert(`Go to user profile: ${video.user.name || video.user.email}`);
  };

  // Format description with hashtags
  const formatDescription = (description: string | null) => {
    if (!description) return null;
    
    // Simple hashtag detection and styling
    return description.split(' ').map((word, index) => {
      if (word.startsWith('#')) {
        return (
          <span key={index} className="text-blue-300 hover:text-blue-400 cursor-pointer">
            {word}{' '}
          </span>
        );
      }
      return word + ' ';
    });
  };

  return (
    <div ref={ref} className="mb-[100px] md:mb-0 relative aspect-[0.5625] bg-black sm:rounded-xl overflow-hidden min-w-[320px] min-h-[568px] h-full group">
      <ReactPlayer
        src={video.videoUrl}
        playing={playing}
        muted={muted}
        loop
        width="100%"
        height="100%"
        controls={false}
        style={{ background: "black" }}
        poster={video.thumbnail || undefined}
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
          <div className="text-white select-text pointer-events-auto max-w-[70%]">
            <button 
              className="font-bold underline pointer-events-auto hover:text-blue-300" 
              tabIndex={0} 
              onClick={handleUserClick}
            >
              @{video.user.name || video.user.email.split('@')[0]}
            </button>
            <div className="mt-1 select-text pointer-events-auto text-sm">
              <div className="font-medium">{video.title}</div>
              {video.description && (
                <div className="mt-1 text-xs">
                  {formatDescription(video.description)}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end pointer-events-auto">
            <div className="flex flex-col items-center">
              <button 
                className={`bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors ${
                  isLiked ? 'bg-red-500/60' : ''
                }`}
                onClick={handleLike}
              >
                <Heart className={`text-white ${isLiked ? 'fill-red-500 text-red-500!' : ''}`} />
              </button>
              {likeCount > 0 && (
                <span className="text-white text-xs mt-1">{likeCount}</span>
              )}
            </div>
            <button 
              className="bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors" 
              onClick={handleComment}
            >
              <MessageCircle className="text-white" />
            </button>
            {video.commentCount > 0 && (
              <span className="text-white text-xs mt-1 text-center">{video.commentCount}</span>
            )}
            <button 
              className="bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors" 
              onClick={() => setShowShare(true)}
            >
              <Share2 className="text-white" />
            </button>
            <button
              className="bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors"
              onClick={onPlayToggle}
            >
              {playing ? (
                <span className="block w-6 h-6">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause text-white">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                </span>
              ) : (
                <Play className="text-white" />
              )}
            </button>
            <button
              className="bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors"
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

      {/* Share Modal */}
      <ShareModal 
        open={showShare} 
        onOpenChange={setShowShare}
      />

      {/* Login Modal */}
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </div>
  );
};

export default VideoCard;