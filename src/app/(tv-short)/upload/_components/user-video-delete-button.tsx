"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deletePinataFile, deleteVideo } from "@/lib/actions/video";

interface DeleteVideoButtonProps {
  pinataId: string;
  title: string;
  userId: string;
  onVideoDeleted?: (pinataId: string) => void;
}

export default function DeleteVideoButton({ pinataId, title, userId, onVideoDeleted }: DeleteVideoButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Bạn có chắc chắn muốn xóa video "${title}"?`)) return;
    startTransition(() => {
      toast.promise(
        (async () => {
          try {
            await deletePinataFile(pinataId);
          } catch (pinataError) {
            // Không chặn xóa DB nếu lỗi xóa pinata
            console.error("Error deleting from Pinata:", pinataError);
          }
          const result = await deleteVideo(pinataId, userId);
          if (result.count === 0) {
            throw new Error("Video không tồn tại hoặc bạn không có quyền xóa");
          }
          if (onVideoDeleted) onVideoDeleted(pinataId);
        })(),
        {
          loading: "Đang xóa...",
          success: "Xóa video thành công!",
          error: (err) =>
            err && typeof err === 'object' && 'message' in err && typeof (err as { message?: unknown }).message === 'string'
              ? (err as { message: string }).message
              : "Có lỗi xảy ra khi xóa video",
        }
      );
    });
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-1" />
          Đang xóa...
        </>
      ) : (
        <>
          <Trash2 className="h-4 w-4 mr-1" />
          Xóa
        </>
      )}
    </Button>
  );
} 