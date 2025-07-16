"use client";

import UploadForm from "./upload-form";
import UserVideosList from "./user-videos-list";
import { useRef } from "react";

// Định nghĩa lại RenderVideo cho type an toàn
 type RenderVideo = {
   id: string;
   title: string;
   description: string | null;
   videoUrl: string;
   thumbnail: string | null;
   pinataId: string;
   createdAt: string;
   updatedAt: string;
 };

export default function UserUploadClient() {
  const addVideoRef = useRef<((video: RenderVideo) => void) | null>(null);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Form */}
        <div>
          <h1 className="text-2xl font-bold mb-6 text-center">Đăng video mới</h1>
          <UploadForm onVideoUploaded={(video) => {
            if (addVideoRef.current) addVideoRef.current(video);
          }} />
        </div>
        {/* User Videos List */}
        <div>
          <UserVideosList addVideoRef={addVideoRef} />
        </div>
      </div>
    </div>
  );
} 