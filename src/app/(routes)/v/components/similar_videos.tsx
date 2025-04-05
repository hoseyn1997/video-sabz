import { collectionWithVideo } from "@/lib/types/collection";
import Card from "@/app/(routes)/v/components/Card";
import React from "react";
import { Icons } from "@/app/components/ui/icons/Icons";

interface Props {
  collection: collectionWithVideo;
}

const SimilarVideos = ({ collection }: Props) => {
  return (
    <div>
      <div className="flex gap-2 items-center py-4 px-0">
        <button
          className="flex justify-center items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-black 
        ring-[0.3px] dark:ring-1 ring-green-500/70 dark:shadow-[0px_0px_0.6px_#fff] rounded-lg"
        >
          <Icons.search className="w-4 stroke-green-500/70 stroke-2" />
          <p className="text-[10px] text-green-500/70 font-bold">موارد مشابه</p>
        </button>
        <button
          className="flex justify-center items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-black 
        ring-[0.3px] dark:ring-[0.4px] ring-gray-500/70 dark:shadow-[0px_0px_0.6px_#fff] rounded-lg"
        >
          <Icons.badge_check className="w-4 stroke-current stroke-1" />
          <p className="text-[10px]">برای شما</p>
        </button>
        <button
          className="flex justify-center items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-black 
        ring-[0.3px] dark:ring-[0.4px] ring-gray-500/70 dark:shadow-[0px_0px_0.6px_#fff] rounded-lg"
        >
          <Icons.fast_forward className="w-4 stroke-current stroke-1" />
          <p className="text-[10px]">از {collection.Teacher.FullName}</p>
        </button>
      </div>
      <div className="">
        {collection && (
          <div key={collection.Id} className="grid gap-3">
            {collection.Videos.map((video) => (
              <Card
                key={video.Id}
                title={video.Title}
                teacher={collection.Teacher.FullName}
                videoId={video.ShortId}
                video={video}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarVideos;
