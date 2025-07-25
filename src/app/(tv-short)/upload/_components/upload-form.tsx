"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createVideo } from "@/lib/actions/video";
import { pinata } from "@/lib/pinata";
import { Loader2, UploadCloud, VideoIcon, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

interface UploadFormValues {
    title: string;
    description: string;
    video: File | null;
}

interface UploadFormProps {
  onVideoUploaded?: (video: RenderVideo) => void;
}

export default function UploadForm({ onVideoUploaded }: UploadFormProps) {
    const session = useSession();
    const isAuthenticated = session?.status === "authenticated";
    const form = useForm<UploadFormValues>({
      defaultValues: { title: "", description: "", video: null },
    });
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
  
    const onDrop = useCallback((acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles[0]) {
        form.setValue("video", acceptedFiles[0], { shouldValidate: true });
        setPreview(URL.createObjectURL(acceptedFiles[0]));
      }
    }, [form]);
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: { "video/mp4": [".mp4"], "video/webm": [".webm"] },
      maxFiles: 1,
    });
  
    const removeVideo = () => {
      form.setValue("video", null);
      setPreview(null);
    };
  
    const uploadVideoToPinata = async (file: File): Promise<{ fileUrl: string, pinataId: string }> => {
      try {
        // Upload file gốc, không đổi tên
        // Lấy signed URL từ API
        const response = await fetch('/api/upload-url');
        if (!response.ok) {
          throw new Error('Không thể lấy signed URL');
        }
        
        const { url } = await response.json();
        
        // Upload file lên Pinata sử dụng signed URL
        const upload = await pinata.upload.public
          .file(file)
          .url(url); 
        
        // Upload the file with the signed URL
        const fileUrl = await pinata.gateways.public.convert(upload.cid)
        
        return { fileUrl, pinataId: upload.id };
      } catch (error) {
        console.error('Upload error:', error);
        throw new Error('Không thể upload video');
      }
    };
  
    const onSubmit = (data: UploadFormValues) => {
      if (!data.title || !data.video) {
        setError("Vui lòng nhập tiêu đề và chọn video!");
        return;
      }
  
      if (!isAuthenticated) {
        setError("Bạn cần đăng nhập để upload video!");
        return;
      }
  
      setError(null);
      setIsUploading(true);
  
      toast.promise(
        (async () => {
          try {
            // 1. Upload video lên Pinata
            const { fileUrl: videoUrl, pinataId } = await uploadVideoToPinata(data.video!);
            
            // 2. Tạo FormData để gửi lên server action
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description || "");
            formData.append("videoUrl", videoUrl);
            formData.append("pinataId", pinataId);
            if (!session.data?.user?.id) {
              throw new Error("Không tìm thấy userId trong session");
            }
            formData.append("userId", session.data.user.id);
            
            // 3. Tạo video trong database
            const result = await createVideo(formData);
            
            // 4. Reset form và preview
            form.reset();
            setPreview(null);
            setIsUploading(false);
            if (onVideoUploaded && result) onVideoUploaded({
              ...result,
              createdAt: typeof result.createdAt === "string" ? result.createdAt : result.createdAt instanceof Date ? result.createdAt.toISOString() : "",
              updatedAt: typeof result.updatedAt === "string" ? result.updatedAt : result.updatedAt instanceof Date ? result.updatedAt.toISOString() : "",
            });
          } catch (err: unknown) {
            setIsUploading(false);
            const message = typeof err === 'object' && err && 'message' in err ? (err as { message?: string }).message : '';
            if (typeof message === 'string' && (message.includes('Unique constraint failed') || message.includes('unique') || message.includes('pinataId'))) {
              throw new Error('Bạn đã upload video này rồi!');
            }
            throw err;
          }
        })(),
        {
          loading: "Đang upload...",
          success: "Upload video thành công!",
          error: (err) => {
            setIsUploading(false);
            setError(err?.message);
            return err?.message || "Có lỗi xảy ra khi upload video"
          },
        }
      );
    };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="video"
            render={() => (
              <FormItem>
                <FormLabel>Video</FormLabel>
                <FormControl>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition bg-muted/50 hover:bg-muted/80 ${isDragActive ? "border-primary" : "border-muted"} ${isUploading ? "pointer-events-none opacity-50" : ""}`}
                  >
                    <input {...getInputProps()} disabled={isUploading} />
                    {preview ? (
                      <div className="relative w-full flex flex-col items-center">
                        <video src={preview} controls className="rounded-lg max-h-64 w-full mb-2" />
                        <Button 
                          type="button" 
                          variant="destructive" 
                          size="sm" 
                          className="absolute top-2 right-2" 
                          onClick={removeVideo}
                          disabled={isUploading}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <UploadCloud className="w-10 h-10" />
                        <span>Kéo thả hoặc bấm để chọn video (mp4, webm)</span>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Vui lòng nhập tiêu đề" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nhập tiêu đề video" 
                    {...field} 
                    disabled={isUploading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Mô tả ngắn về video (không bắt buộc)" 
                    {...field} 
                    disabled={isUploading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full text-base font-semibold py-6"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang upload...
              </>
            ) : (
              <>
                <VideoIcon className="mr-2" />
                Đăng video
              </>
            )}
          </Button>
          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertTitle>Lỗi</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
  )
}
