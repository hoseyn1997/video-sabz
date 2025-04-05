"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { videoWithCollection } from "@/lib/types/video";
import Loading from "../../ui/loader/loading";
import { Icons } from "../../ui/icons/Icons";
import useVideoStore from "@/lib/stores/videoStore";
import { useSearchParams } from "next/navigation";
import VideoCard from "./videoCard";
import VideoCardPlaceholder from "./videoCardPlaceholder";

export default function VideosList({
  initialVideos,
  currentPage,
  totalPages,
  ITEMS_PER_PAGE,
}: {
  initialVideos: videoWithCollection[];
  currentPage: number;
  totalPages: number;
  ITEMS_PER_PAGE: number;
}) {
  const router = useRouter();

  const {
    getVideos,
    videos,
    setVideos,
    pagination_page,
    isLoading,
    setPaginationPage,
    setItemsPPage,
  } = useVideoStore();

  const searchParams = useSearchParams();
  const pageQueryParameter = Number(searchParams.get("page"));

  useEffect(() => {
    if (ITEMS_PER_PAGE) {
      setItemsPPage(ITEMS_PER_PAGE);
    }
    if (pageQueryParameter) {
      setPaginationPage(pageQueryParameter);
    }
    if (initialVideos) {
      if (videos.length === 0) setVideos(initialVideos);
    }
    if (pagination_page > 1) {
      router.replace(`/?page=${pagination_page}`, { scroll: false });
    }
  }, []);

  const loadMore = async () => {
    if (pagination_page >= totalPages) return;
    try {
      getVideos(currentPage);
      router.replace(`/?page=${currentPage + 1}`, {
        scroll: false,
      });
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 gap-x-1">
        {videos.map((video) => (
          <VideoCard key={video.Id} video={video} />
        ))}
        {(isLoading || videos.length === 0) && (
          <>
            <VideoCardPlaceholder />
            <VideoCardPlaceholder />
          </>
        )}
      </div>

      <div className="relative my-4 flex ltr items-center">
        <div className="w-full h-[1px] shadow-[0px_0.5px_0px_0px_#8080804d]"></div>
        <button
          disabled={pagination_page >= totalPages || isLoading}
          onClick={loadMore}
          className="w-fit rounded-full bg-white dark:bg-dark transition-all flex justify-center items-center px-3 py-2 gap-2 shadow-[0px_0px_1px_gray] scale-75"
        >
          <span
            className={`text-gray-600 dark:text-gray-400 text-xs ${
              pagination_page >= totalPages && "opacity-50"
            }`}
          >
            بیشتر
          </span>
          {isLoading ? (
            <Loading
              className={`w-4 stroke-current ${
                pagination_page >= totalPages && "opacity-20"
              }`}
            />
          ) : (
            <Icons.rocket
              className={`w-4 stroke-current ${
                pagination_page >= totalPages && "opacity-20"
              }`}
            />
          )}
        </button>
        <div className="w-full h-[1px] shadow-[0px_0.5px_0px_0px_#8080804d]"></div>
      </div>
    </>
  );
}
