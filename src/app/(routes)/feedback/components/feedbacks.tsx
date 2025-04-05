import { Icons } from "@/app/components/ui/icons/Icons";
import { prisma } from "@/lib/db/db";
import React from "react";

const Feedbacks = async () => {
  const feedbacks = await prisma.feedBack.findMany({
    orderBy: {
      AddedAt: "desc",
    },
  });
  return (
    <section className="feedbacks relative mt-2 grid gap-2 p-3 pb-5 shadow-[0px_0.5px_0px_0px_#9ca3af] lg:p-5">
      <div className="flex items-center gap-3">
        <Icons.comments className="mb-2 w-12 rounded-lg bg-gray-100 stroke-gray-400 p-2 dark:bg-gray-100/30 dark:stroke-green-400" />
        <div className="mb-2 self-end">
          <p className="text-lg font-bold">All Feedbacks</p>
          <p className="text-xs text-gray-400">Thanks For Sharing Ideas</p>
        </div>
      </div>
      {feedbacks.map((feedBack) => (
        <div
          key={feedBack.Id}
          className="grid gap-1 bg-gray-100 p-2 dark:bg-black"
        >
          <div className="flex gap-1">
            <Icons.new_user className="w-8" />
            <div className="self-end">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {feedBack.LinkdinId}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                {feedBack.AddedAt.toLocaleDateString()}
              </p>
            </div>
            <div className="mx-2 self-start text-xs">
              <div className="flex items-center">
                <Icons.star className="w-3 cursor-pointer stroke-gray-500 stroke-[1px] dark:stroke-gray-300" />
                <Icons.star
                  className={`w-3 cursor-pointer ${
                    feedBack.Score > 4 && "fill-yellow-500"
                  } stroke-gray-500 stroke-[1px] dark:stroke-gray-300`}
                />
                <Icons.star className="w-3 cursor-pointer fill-yellow-500 stroke-gray-500 stroke-[1px] dark:stroke-gray-300" />
                <Icons.star className="w-3 cursor-pointer fill-yellow-500 stroke-gray-500 stroke-[1px] dark:stroke-gray-300" />
                <Icons.star className="w-3 cursor-pointer fill-yellow-500 stroke-gray-500 stroke-[1px] dark:stroke-gray-300" />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {feedBack.FeedBack}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Feedbacks;
