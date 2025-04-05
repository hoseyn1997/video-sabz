"use client";
import React, { useEffect, useState } from "react";
import InteractButton from "./interact_button";
import { Icons } from "@/app/components/ui/icons/Icons";
import { Video } from "@prisma/client";
import useDrawer from "@/lib/contexts/drawerContext";
import Comments from "./comments";
import useVideoStore from "@/lib/stores/videoStore";
import Loading from "@/app/components/ui/loader/loading";

interface Props {
  video: Video;
  teacher?: string;
  teacherId: string;
  followersCount: number;
}

const VideoInfo = ({ video, teacher, teacherId, followersCount }: Props) => {
  const { openDrawer } = useDrawer();
  const [screenWidth, setScreenWidth] = useState(0);
  const [commentsHeader, setcommentsHeader] = useState<HTMLParagraphElement>();
  const [showMore, setShowMore] = useState(false);

  const {
    likeVideo,
    isLiking,
    saveVideo,
    isSaving,
    currentVideoInfo: info,
    getCurrentVideoInfo,
    gettingVideoInfo,
    followTeacher,
    isfollowing,
  } = useVideoStore();

  useEffect(() => {
    setScreenWidth(window.screen.width);
    setcommentsHeader(
      document.getElementById("commentsHeader") as HTMLParagraphElement,
    );
  }, [setScreenWidth, setcommentsHeader]);

  useEffect(() => {
    getCurrentVideoInfo(video.Id);
  }, [getCurrentVideoInfo]);

  return (
    <div className="rtl px-2">
      <h1
        className="rtl m-1 text-lg font-bold"
        style={{ fontFamily: "DefaultFont" }}
      >
        {video.Title}
      </h1>
      <div className="flex items-center gap-2 text-[10px] text-gray-500">
        <p className="">1289 بازدید - </p>
        <p>2 روز پیش</p>
        {!showMore && (
          <button
            onClick={() => setShowMore(true)}
            className="font-bold text-sky-500"
          >
            بیشتر...
          </button>
        )}
      </div>
      {showMore && (
        <div className="my-1">
          <p className="Just3Rows text-justify text-xs text-gray-500">
            {video.Description}
          </p>
          <button
            onClick={() => setShowMore(false)}
            className="text-[10px] font-bold text-sky-500"
          >
            کمتر...
          </button>
        </div>
      )}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="my-2 flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square w-8 items-center justify-center rounded-full bg-gray-100">
              <Icons.teacher className="w-7 stroke-current dark:stroke-gray-700" />
            </div>
            <div className="grid gap-1">
              <p className="align-middle text-sm font-bold">{teacher}</p>
              <p className="align-middle text-[8px] text-gray-500">
                {followersCount} دنبال کننده
              </p>
            </div>
          </div>
          <InteractButton
            onClick={() => followTeacher(teacherId)}
            className="flex gap-1 rounded bg-orange-500/80 p-1.5 text-xs font-bold text-white"
            icon={
              isfollowing ? (
                <Loading className="w-4 stroke-1" />
              ) : (
                <Icons.add_user className="w-3 stroke-2" />
              )
            }
            content={
              <p> {info?.isTeacherFollowed ? "دنبال نکردن" : "دنبال کردن"}</p>
            }
          />
        </div>
        <div className="flex items-center justify-end gap-2 md:justify-center">
          {gettingVideoInfo ? (
            <>
              <button
                disabled
                className="flex animate-pulse items-center justify-center gap-1 rounded bg-gray-200 p-1.5 text-xs opacity-70 dark:bg-gray-400/10"
              >
                <Icons.heart className={`"fill-gray-600 w-4 stroke-1`} />
                <p>121</p>
              </button>
              <button
                disabled
                className="flex animate-pulse items-center justify-center gap-1 rounded bg-gray-200 p-1.5 text-xs opacity-70 dark:bg-gray-400/10"
              >
                <Icons.bookmark className={`"fill-gray-600 w-4 stroke-1`} />
                <p>ذخیره</p>
              </button>
            </>
          ) : (
            <>
              <InteractButton
                onClick={() => likeVideo(video.Id)}
                className="flex items-center justify-center gap-1 rounded bg-gray-50 p-1.5 text-xs dark:bg-gray-400/10"
                icon={
                  isLiking ? (
                    <Loading className="w-4 stroke-1" />
                  ) : (
                    <Icons.heart
                      className={`w-4 stroke-1 ${info?.isLiked ? "fill-red-600 stroke-red-600" : "fill-none"}`}
                    />
                  )
                }
                content={<p>121</p>}
              />

              <InteractButton
                onClick={() => saveVideo(video.Id)}
                className={`flex items-center justify-center gap-1 rounded bg-gray-50 p-1.5 text-xs dark:bg-gray-400/10`}
                icon={
                  isSaving ? (
                    <Loading className="w-4 stroke-1" />
                  ) : (
                    <Icons.bookmark
                      className={`w-4 stroke-1 ${info?.isSaved ? "fill-gray-600" : "fill-none"}`}
                    />
                  )
                }
                content={<p>ذخیره</p>}
              />
            </>
          )}
          <InteractButton
            onClick={() =>
              screenWidth > 768
                ? commentsHeader?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                  })
                : openDrawer(
                    <Comments
                      video={video}
                      className="example3 mt-0 max-h-96 overflow-hidden overflow-y-auto"
                    />,
                  )
            }
            className="flex items-center justify-center gap-1 rounded bg-gray-50 p-1.5 text-xs dark:bg-gray-400/10"
            icon={<Icons.comment className="w-4 stroke-1" />}
            content={<p>دیدگاه ها</p>}
          />
          <InteractButton
            className="flex items-center justify-center gap-1 rounded bg-gray-50 p-1.5 text-xs dark:bg-gray-400/10"
            icon={<Icons.share className="w-4 stroke-1" />}
            content={<p>اشتراک</p>}
          />
        </div>
      </div>

      <Comments video={video} className="mt-3 hidden lg:block" />
    </div>
  );
};

export default VideoInfo;
