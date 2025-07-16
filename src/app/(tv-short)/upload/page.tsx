import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UserUploadClient from "./_components/user-upload-client";

export default async function Upload() {
  const session = await auth();
  if (!session) return redirect("/");

  return <UserUploadClient />;
}