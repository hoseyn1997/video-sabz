"use client";
import { collectionWithVideo } from "@/lib/types/collection";
import { Icons } from "@/app/components/ui/icons/Icons";
import Card from "@/app/(routes)/v/components/Card";
import React, { useRef, useState } from "react";
import SimilarVideos from "./similar_videos";
import useVideoStore from "@/lib/stores/videoStore";
import Loading from "@/app/components/ui/loader/loading";

interface Props {
  collection: collectionWithVideo;
  isCollectionSaved: boolean;
}

const CollectionVideos = ({
  collection,
  isCollectionSaved: isSaved,
}: Props) => {
  const [openCollectionVideos, setOpenCollectionVideos] = useState(false);
  const videosList = useRef<HTMLDivElement>(null);
  const videoListButton = useRef<HTMLButtonElement>(null);
  const { saveCollection, isSavingCollection } = useVideoStore();
  const [isCollectionSaved, setIsCollectionSaved] = useState<boolean>(isSaved);

  const toggleVideoList = () => {
    if (openCollectionVideos) {
      setOpenCollectionVideos(false);
      videoListButton.current?.classList.remove("rotate-180");
      videosList.current?.classList.add("h-16");
      videosList.current?.classList.remove("h-[488px]");
    } else {
      setOpenCollectionVideos(true);
      videoListButton.current?.classList.add("rotate-180");
      videosList.current?.classList.remove("h-16");
      videosList.current?.classList.add("h-[488px]");
    }
  };

  return (
    <>
      <div
        ref={videosList}
        className="example mb-2 h-16 overflow-auto rounded-xl ring-[0.3px] ring-gray-500/70 transition-all dark:shadow-[0px_0px_0.6px_#fff] dark:ring-[0.4px]"
      >
        <div className="sticky top-0 z-10 mb-0 flex h-16 justify-between rounded-xl bg-white p-4 dark:bg-dark">
          <div className="flex items-center justify-start gap-2 text-xs">
            <Icons.video_list className="w-3 stroke-current" />
            <span>{collection?.Title}</span>
          </div>
          <div className="flex gap-2">
            <button
              title="کامنت ها"
              className="rounded-xl p-2 px-2.5 ring-[0.5px] ring-gray-500/70 transition-all hover:bg-gray-50 dark:shadow-[0px_0px_0.6px_#fff] dark:hover:bg-black"
            >
              <Icons.comments className="w-3 stroke-current" />
            </button>
            <button
              onClick={() =>
                saveCollection(collection.Id).then(() => {
                  setIsCollectionSaved(!isCollectionSaved);
                })
              }
              title="ذخیره"
              className="rounded-xl p-2 px-2.5 ring-[0.5px] ring-gray-500/70 transition-all hover:bg-gray-50 dark:shadow-[0px_0px_0.6px_#fff] dark:hover:bg-black"
            >
              {isSavingCollection ? (
                <Loading className="w-3 stroke-current" />
              ) : (
                <Icons.bookmark
                  className={`w-3 stroke-current ${isCollectionSaved ? "fill-gray-500" : "fill-none"}`}
                />
              )}
            </button>
            <button
              onClick={toggleVideoList}
              ref={videoListButton}
              title="موارد مشابه"
              className="rounded-xl p-2 px-2.5 ring-[0.5px] ring-gray-500/70 transition-all hover:bg-gray-50 dark:shadow-[0px_0px_0.6px_#fff] dark:hover:bg-black"
            >
              <Icons.arrow_left className="w-3 -rotate-90 stroke-current" />
            </button>
          </div>
        </div>
        <div className="px-1">
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
      <SimilarVideos collection={collection} />
    </>
  );
};

export default CollectionVideos;
