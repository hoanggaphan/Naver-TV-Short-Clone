"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { VideoIcon, UploadCloud, X } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface UploadFormValues {
  title: string;
  description: string;
  video: File | null;
}

export default function Upload() {
  const form = useForm<UploadFormValues>({
    defaultValues: { title: "", description: "", video: null },
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const onSubmit = async (data: UploadFormValues) => {
    if (!data.title || !data.video) {
      setError("Vui lòng nhập tiêu đề và chọn video!");
      return;
    }
    setError(null);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.video) formData.append("video", data.video);
    // TODO: Gửi formData lên API /api/upload
    alert("Đã gửi! (Chưa kết nối API)");
  };

  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Đăng video mới</h1>
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
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition bg-muted/50 hover:bg-muted/80 ${isDragActive ? "border-primary" : "border-muted"}`}
                  >
                    <input {...getInputProps()} />
                    {preview ? (
                      <div className="relative w-full flex flex-col items-center">
                        <video src={preview} controls className="rounded-lg max-h-64 w-full mb-2" />
                        <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={removeVideo}>
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
                  <Input placeholder="Nhập tiêu đề video" {...field} />
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
                  <Textarea placeholder="Mô tả ngắn về video (không bắt buộc)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full text-base font-semibold py-6">
            <VideoIcon className="mr-2" /> Đăng video
          </Button>
          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertTitle>Lỗi</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
    </div>
  );
}
  