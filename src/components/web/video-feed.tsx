import React from "react";
import ReactPlayer from 'react-player'

const VideoFeed: React.FC = () => {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="snap-center p-[1em] h-screen flex items-center justify-center"
        >
            <div className="aspect-[0.5625] bg-muted rounded-lg overflow-hidden min-w-[320px] min-h-[568px] h-full">
              <ReactPlayer 
                src="/video-test.mp4"
                className="w-full h-full" 
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
        </div>
      ))}
    </div>
  );
};

export default VideoFeed; 