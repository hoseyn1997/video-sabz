"use client";

import React, { useEffect, useRef, useState } from "react";
import usePlayerStore from "@/lib/stores/playerStore";
import { Icons } from "../../../components/ui/icons/Icons";

interface Props {
  inputVideoId: string;
}

const CustomVideoPlayer: React.FC<Props> = ({ inputVideoId }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(true);
  const videoControlsRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    isPlaying,
    playbackSpeed,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    isFullscreen,
    setIsFullscreen,
    isMuted,
    skipFeedback,
    setVideoElement,
    togglePlayPause,
    changePlaybackSpeed,
    toggleVolume,
    handleSeek,
    handleDoubleClick,
    loading,
    setLoading,
    setIsPlaying,
    setIsMuted,
    setPlaybackSpeed,
  } = usePlayerStore();

  useEffect(() => {
    const video = videoRef?.current;

    if (video) {
      // Show loading when the video is waiting for data
      const handleWaiting = () => setLoading(true);
      // Hide loading when the video can play
      const handleCanPlay = () => setLoading(false);
      video.addEventListener("waiting", handleWaiting);
      video.addEventListener("canplay", handleCanPlay);

      setVideoElement(videoRef);
      const updateTime = () => setCurrentTime(video.currentTime);
      const updateDuration = () => {
        if (!isNaN(video.duration)) {
          setDuration(video.duration);
        }
      };
      updateDuration();
      video.addEventListener("timeupdate", updateTime);
      video.addEventListener("loadedmetadata", updateDuration);

      return () => {
        video.removeEventListener("timeupdate", updateTime);
        video.removeEventListener("loadedmetadata", updateDuration);

        video.removeEventListener("waiting", handleWaiting);
        video.removeEventListener("canplay", handleCanPlay);

        // restore the video state when leave the component.
        setCurrentTime(0);
        setIsPlaying(false);
        setIsMuted(false);
        setPlaybackSpeed(1);
      };
    }
  }, [
    setVideoElement,
    setLoading,
    setCurrentTime,
    setDuration,
    setIsPlaying,
    setIsMuted,
    setPlaybackSpeed,
  ]);

  const toggleFullscreen = async () => {
    if (videoContainerRef.current) {
      if (!isFullscreen) {
        if (videoContainerRef.current.requestFullscreen) {
          await videoContainerRef.current.requestFullscreen();

          const isMobile = /Mobi|Android/i.test(navigator.userAgent);
          if (
            isMobile &&
            "orientation" in screen &&
            typeof (screen.orientation as any).lock === "function"
          ) {
            try {
              await (screen.orientation as any).lock("landscape");
            } catch (error) {
              console.error("Failed to lock orientation:", error);
            }
          }
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();

          // Unlock orientation on exiting fullscreen
          if (
            "orientation" in screen &&
            typeof (screen.orientation as any).unlock === "function"
          ) {
            (screen.orientation as any).unlock();
          }
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleVideoClick = () => {
    // Clear the previous timeout (if any)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (showPlayPauseIcon) {
      videoControlsRef.current?.classList.add("opacity-0");
      setTimeout(() => {
        videoControlsRef.current?.classList.add("hidden");
        videoControlsRef.current?.classList.remove("flex");
      }, 400);
    } else {
      videoControlsRef.current?.classList.remove("opacity-0");

      videoControlsRef.current?.classList.remove("hidden");
      videoControlsRef.current?.classList.add("flex");
    }
    setShowPlayPauseIcon((prev) => !prev);

    // If the video is playing, hide the icon after 10 seconds
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setShowPlayPauseIcon(false);
        videoControlsRef.current?.classList.add("opacity-0");
        setTimeout(() => {
          videoControlsRef.current?.classList.remove("flex");
          videoControlsRef.current?.classList.add("hidden");
        }, 400);
      }, 5000);
    }
  };

  // Format time helper function
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  // Render loading indicator
  const renderLoadingIndicator = () => {
    if (loading) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      ref={videoContainerRef}
      className="relative overflow-hidden lg:rounded-xl dark:shadow-[0px_0px_1px_#fff]"
      onDoubleClick={handleDoubleClick}
    >
      <video
        ref={videoRef}
        src={`/api/video/${inputVideoId}`}
        className={`w-full h-full max-h-[202px] md:max-h-[521px]`}
        style={isFullscreen ? { maxHeight: "100%" } : {}}
        onClick={handleVideoClick}
        onEnded={() => console.log("ended video")}
      >
        Your browser does not support the video tag.
      </video>

      {/* Loading Indicator */}
      {renderLoadingIndicator()}

      {skipFeedback.visible && (
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 bg-black/25 text-white text-sm font-bold p-2 rounded-full animate-fade ${
            skipFeedback.position === "left" ? "left-10" : "right-10"
          }`}
        >
          {skipFeedback.text}
        </div>
      )}
      {showPlayPauseIcon && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <Icons.pause className="w-12 h-12 text-white bg-black/25 p-1 rounded-full" />
          ) : (
            <Icons.play className="w-12 h-12 text-white bg-black/25 p-1 rounded-full" />
          )}
        </div>
      )}
      <div
        ref={videoControlsRef}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-black/0 p-3 flex items-center space-x-2 text-xs transition-all duration-300"
      >
        <button
          onClick={togglePlayPause}
          className="text-white hover:bg-white/15 p-1 rounded-full"
        >
          {isPlaying ? (
            <Icons.pause className="w-6" />
          ) : (
            <Icons.play className="w-6" />
          )}
        </button>
        <button
          onClick={toggleVolume}
          className="text-white hover:bg-white/15 p-1 rounded-full transition-colors duration-200"
        >
          {isMuted ? (
            <Icons.voloff className="w-6" />
          ) : (
            <Icons.volon className="w-6" />
          )}
        </button>
        <button
          onClick={changePlaybackSpeed}
          className="text-white hover:bg-white/15 p-1 text-[10px] w-8 h-8 aspect-square rounded-full felx justify-center items-center"
        >
          {playbackSpeed}x
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={duration ? (currentTime / duration) * 100 : 0}
          onChange={handleSeek}
          className="flex-1 focus:outline-none"
          style={{
            ["--progress" as any]: `${(currentTime / (duration || 1)) * 100}%`,
          }}
        />
        <span className="text-white">
          {formatTime(currentTime)} /{" "}
          {duration ? formatTime(duration) : "00:00"}
        </span>
        <button
          onClick={toggleFullscreen}
          className="text-white hover:bg-white/15 p-1 rounded-full"
        >
          {isFullscreen ? (
            <Icons.fullscreen className="w-6" />
          ) : (
            <Icons.fullscreen className="w-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
