import { Alert, AlertDescription } from "@/components/ui/alert";
import { VideoIcon } from "lucide-react";
import { getUserVideos } from "@/lib/actions/video";
import DeleteVideoButton from "./user-video-delete-button";

interface UserVideosListProps {
  userId: string;
}

// For rendering, we want createdAt/updatedAt as string
interface RenderVideo {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  thumbnail: string | null;
  pinataId: string;
  createdAt: string;
  updatedAt: string;
}

export default async function UserVideosList({ userId }: UserVideosListProps) {
  if (!userId) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Không tìm thấy userId</AlertDescription>
      </Alert>
    );
  }

  let videos: RenderVideo[] = [];
  let error: string | null = null;
  try {
    const result = await getUserVideos(userId, 1, 100); // lấy tối đa 100 video
    videos = result.videos.map(v => ({
      ...v,
      createdAt: typeof v.createdAt === 'string' ? v.createdAt : v.createdAt.toISOString(),
      updatedAt: typeof v.updatedAt === 'string' ? v.updatedAt : v.updatedAt.toISOString(),
    }));
  } catch {
    error = "Không thể tải danh sách video";
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <VideoIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>Bạn chưa có video nào</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Video của bạn ({videos.length})</h2>
      <div className="grid gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border rounded-lg p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors"
          >
            {/* Video thumbnail/preview */}
            <div className="flex-shrink-0">
              <div className="w-32 h-20 bg-muted rounded-lg overflow-hidden">
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover"
                  muted
                  preload="metadata"
                />
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
              <DeleteVideoButton pinataId={video.pinataId} title={video.title} userId={userId} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}