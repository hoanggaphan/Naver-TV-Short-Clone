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
    <div className="max-w-3xl mx-auto py-8 px-2 sm:px-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 mb-8 w-full">
        <div className="flex flex-col items-center w-full md:w-auto">
          <Avatar className="w-24 h-24 md:w-28 md:h-28 mb-3 shadow-lg">
            <AvatarImage src={user?.image || "/avatar.jpeg"} alt={user?.name || "avatar"} />
            <AvatarFallback>
              {user?.name?.[0]?.toUpperCase() || <User2 className="w-8 h-8" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center text-center w-full">
            <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-bold">
              <User2 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              {user?.name || "Chưa đặt tên"}
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground mt-1 text-sm md:text-base">
              <Mail className="w-4 h-4" />
              {user?.email}
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm md:text-base">
              <Video className="w-4 h-4 text-primary" />
              <span className="font-medium">{totalVideos}</span> video
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center md:justify-end mt-4 md:mt-0">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
  