// src/app/(tv-short)/upload/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UploadForm from "./_components/upload-form";
import UserVideosList from "./_components/user-videos-list";

export default async function Upload() {
  const session = await auth()
 
  if (!session?.user || typeof session.user.id !== 'string') return redirect("/");

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Form */}
        <div>
          <h1 className="text-2xl font-bold mb-6 text-center">Đăng video mới</h1>
          <UploadForm />
        </div>
        
        {/* User Videos List */}
        <div>
          <UserVideosList userId={session.user.id} />
        </div>
      </div>
    </div>
  );
}