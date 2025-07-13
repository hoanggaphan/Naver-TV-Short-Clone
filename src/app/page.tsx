import SideNav from "@/components/web/side-nav";
import VideoCard from "@/components/web/video-card";

export default async function Home() {
  return (
    <div className="flex">
      <SideNav/>
      <VideoCard/>
    </div>
  );
}
