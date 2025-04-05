import { prisma } from "@/lib/db/db";
import React from "react";
import { Accordion } from "@/app/components/features/accordion";
import AddVideoButton from "./add_video_button";
import { Icons } from "@/app/components/ui/icons/Icons";
import ManageVideos from "./manage_videos";

const ManageCollections = async () => {
  const collections = await prisma.collection.findMany({
    include: {
      Photo: {
        include: { Photo: true },
      },
      Videos: {
        include: {
          Photo: {
            include: {
              Photo: true,
            },
          },
          Collection: {
            include: {
              Photo: {
                include: {
                  Photo: true,
                },
              },
              Teacher: true,
            },
          },
        },
      },
    },
  });
  return (
    <div className="rtl mx-auto max-w-2xl">
      <div className="mx-auto flex items-center justify-start gap-2 py-2">
        <Icons.video_list className="w-4 stroke-green-500" />
        <h1 className="py-1 text-xs font-bold text-green-500">
          مدیریت کالکشن ها
        </h1>
      </div>
      <Accordion
        items={collections.map((c, idx) => {
          return {
            title: idx + 1 + ". " + c.Title,
            content: <ManageVideos collection={c} key={c.Id} />,
          };
        })}
      />
    </div>
  );
};

export default ManageCollections;
