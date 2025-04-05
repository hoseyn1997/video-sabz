"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface VideoPlayerProps {
  videoId?: string;
  videoPhoto?: string;
  className?: string;
  collectionPhoto?: string;
}

const Preview = ({
  videoId,
  className,
  collectionPhoto,
  videoPhoto,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = `/api/preview/${videoId?.replace(" ", "")}-preview`;
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <div className={className}>
      {videoEnded && (
        <Image
          src={videoPhoto! || collectionPhoto || "/assets/collection1.webp"}
          alt={videoId!}
          width={300}
          height={176}
          className="max-w-2xl w-full aspect-video rounded-xl sm:max-h-40 lg:max-h-44 object-cover"
          onContextMenu={(e) => e.preventDefault()}
        />
      )}
      {!videoEnded && (
        <video
          ref={videoRef}
          onEnded={() => setVideoEnded(true)}
          // controls
          autoPlay
          muted
          onContextMenu={(e) => e.preventDefault()}
          className="max-w-2xl w-full aspect-video rounded-xl sm:max-h-40 lg:max-h-44 object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default Preview;
