"use client";
import { Icons } from "@/app/components/ui/icons/Icons";
import { collectionWithPhoto_Videos } from "@/lib/types/collection";
import React, { useState } from "react";
import AddVideoButton from "./add_video_button";
import useVideoStore from "@/lib/stores/videoStore";
import Loading from "@/app/components/ui/loader/loading";

interface Props {
  collection: collectionWithPhoto_Videos;
}

export default function ManageVideos({ collection: c }: Props) {
  const { deleteVideo, isDeleting } = useVideoStore();

  const [videos, SetVideos] = useState(c.Videos);
  const handleDeleteVideo = async (videoId: string) => {
    deleteVideo(videoId).then(() => {
      SetVideos(videos.filter((x) => x.Id !== videoId));
    });
  };
  return (
    <div key={c.Id} className="flex flex-col gap-2 py-0.5">
      {videos.map((v, v_idx) => (
        <div key={v.Id} className="grid cursor-pointer gap-0.5 p-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold">{v_idx + 1 + ". " + v.Title}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleDeleteVideo(v.Id)}
                className="group flex h-6 w-6 items-center justify-center rounded-full transition-all hover:bg-gray-100 dark:hover:bg-gray-400/40"
              >
                {isDeleting ? (
                  <Loading className="w-3" />
                ) : (
                  <Icons.trash className="w-3 group-hover:stroke-red-500" />
                )}
              </button>
              <button className="group flex h-6 w-6 items-center justify-center rounded-full transition-all hover:bg-gray-100 dark:hover:bg-gray-400/40">
                <Icons.settings className="w-3 group-hover:stroke-teal-500" />
              </button>
            </div>
          </div>
          <p className="Just4Rows text-[10px] text-gray-400 dark:text-gray-50">
            {v.Description}
          </p>
        </div>
      ))}
      <AddVideoButton collection={c} />
    </div>
  );
}
