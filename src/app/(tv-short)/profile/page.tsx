import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/lib/actions/user";
import { getUserVideosCount } from "@/lib/actions/video";
import { Mail, User2, Video } from "lucide-react";
import { redirect } from "next/navigation";
import LogoutButton from "./_components/LogoutButton";

export default async function Profile() {
  const session = await auth();
  if (!session?.user || !session?.user?.id) return redirect("/");

  const user = await getCurrentUser(session.user.id);
  const totalVideos = user ? await getUserVideosCount(user.id) : 0;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex items-center gap-6 mb-8">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user?.image || "/avatar.jpeg"} alt={user?.name || "avatar"} />
          <AvatarFallback>
            {user?.name?.[0]?.toUpperCase() || <User2 className="w-8 h-8" />}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold">
            <User2 className="w-6 h-6 text-primary" />
            {user?.name || "Chưa đặt tên"}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <Mail className="w-4 h-4" />
            {user?.email}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Video className="w-4 h-4 text-primary" />
            <span className="font-medium">{totalVideos}</span> video
          </div>
        </div>
        <div className="ml-auto">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
  