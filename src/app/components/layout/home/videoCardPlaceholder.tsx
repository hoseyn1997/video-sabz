import React from "react";

const VideoCardPlaceholder = () => {
  return (
    <div className="relative grid gap-1 group rtl w-full rounded-xl transition-all cursor-pointer justify-self-center p-2 h-[259px]">
      <div className="min-h-40 w-full bg-gray-100/80 dark:bg-gray-50/10 rounded-xl"></div>
      <div className="min-h-20 flex flex-col gap-2">
        <div className="h-10 bg-gray-100/80 dark:bg-gray-50/10 rounded-t-xl"></div>
        <div className="h-8 bg-gray-100/80 dark:bg-gray-50/10"></div>
        <div className="h-4 bg-gray-100/80 dark:bg-gray-50/10 rounded-b-xl"></div>
      </div>
    </div>
  );
};

export default VideoCardPlaceholder;
