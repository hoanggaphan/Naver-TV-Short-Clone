import SideNav from "@/components/web/side-nav";
import VideoFeed from "@/components/web/video-feed";

export default async function Home() {
  return (
    <div className="flex">
      <SideNav/>
      <div className="flex-1">
        <VideoFeed />
      </div>
    </div>
  );
}
