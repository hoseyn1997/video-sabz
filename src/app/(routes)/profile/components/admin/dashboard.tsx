import { Icons } from "@/app/components/ui/icons/Icons";
import { prisma } from "@/lib/db/db";
import React from "react";

const Dashboard = async () => {
  const total_comments = await prisma.comment.count();
  const totla_likes = await prisma.videoLike.count();
  const total_saves = await prisma.videoSave.count();
  const total_videos = await prisma.video.count();
  const total_users = await prisma.user.count();
  return (
    <div className="rtl mx-auto max-w-screen-minicontainer">
      <div className="flex items-center justify-start gap-2">
        <div className="rounded-full bg-blue-500 p-2">
          <Icons.dashboard className="w-5 stroke-white stroke-2" />
        </div>
        <p className="text-lg font-bold">داشبورد</p>
      </div>
      <div className="flex items-center justify-center gap-1 py-5 md:gap-10 md:p-5">
        <div className="flex aspect-square w-44 flex-col items-center justify-center gap-2 rounded-xl bg-teal-400/20 p-0 dark:bg-teal-500/30">
          <Icons.thumbs_up className="w-6 stroke-2" />
          <p className="truncate text-sm">total likes</p>
          <p className="text-xl font-bold">{totla_likes.toLocaleString()}</p>
        </div>
        <div className="flex aspect-square w-44 flex-col items-center justify-center gap-2 rounded-xl bg-yellow-400/20 p-0 dark:bg-yellow-500/30">
          <Icons.comments className="w-6 stroke-2" />
          <p className="truncate text-sm">total comments</p>
          <p className="text-xl font-bold">{total_comments.toLocaleString()}</p>
        </div>
        <div className="flex aspect-square w-44 flex-col items-center justify-center gap-2 rounded-xl bg-purple-400/20 p-0 dark:bg-purple-500/30">
          <Icons.share className="w-6 stroke-2" />
          <p className="truncate text-sm">total shares</p>
          <p className="text-xl font-bold">{total_saves.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 py-5 md:gap-10 md:p-5">
        <div className="flex aspect-square w-44 flex-col items-center justify-center gap-2 rounded-xl bg-orange-400/20 p-0 dark:bg-orange-500/30">
          <Icons.clapperboard className="w-6 stroke-2" />
          <p className="truncate text-sm">total videos</p>
          <p className="text-xl font-bold">{total_videos.toLocaleString()}</p>
        </div>
        <div className="flex aspect-square w-44 flex-col items-center justify-center gap-2 rounded-xl bg-green-400/20 p-0 dark:bg-green-500/30">
          <Icons.bookmark className="w-6 stroke-2" />
          <p className="truncate text-sm">total blogs</p>
          <p className="text-xl font-bold">0</p>
        </div>
        <div className="flex aspect-square w-44 flex-col items-center justify-center gap-2 rounded-xl bg-pink-500/20 p-0 dark:bg-pink-500/30">
          <Icons.badge_check className="w-6 stroke-2" />
          <p className="truncate text-sm">total users</p>
          <p className="text-xl font-bold">{total_users.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex items-center justify-start gap-2">
        <div className="rounded-full bg-blue-500 p-2">
          <Icons.bell className="w-5 stroke-white stroke-2" />
        </div>
        <p className="text-lg font-bold">فعالیت های اخیر</p>
      </div>
      <div className="flex items-center gap-2 p-5">
        <Icons.arrow_left className="w-3 stroke-current" />
        <span className="text-sm">اخیرا فعالیتی رخ نداده است</span>
      </div>
    </div>
  );
};

export default Dashboard;
