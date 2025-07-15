import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UploadForm from "./_components/upload-form";

export default async function Upload() {
  const session = await auth()
 
  if (!session?.user) return redirect("/");

  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Đăng video mới</h1>
      <UploadForm/>
    </div>
  );
}
