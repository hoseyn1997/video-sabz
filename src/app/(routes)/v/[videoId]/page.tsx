import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/db/db";
import Player from "@/app/(routes)/v/components/Player";
import { notFound } from "next/navigation";
import VideoInfo from "../components/video_total_inof";
import CollectionVideos from "../components/collection_videos";
import { get_xUser } from "@/lib/utils/get_x_user";
import { headers } from "next/headers";
import { x_user } from "@/lib/types/user";

interface Props {
  params: Promise<{ videoId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { videoId } = await params;
  return {
    title: `${videoId} - Product Details`,
    description: `Details about the product ${videoId} .`,
  };
};

export default async function page({ params, searchParams }: Props) {
  const { videoId } = await params;
  const queryParams = await searchParams;

  const custom_video = await prisma.video.findFirst({
    where: { ShortId: videoId },
    include: {
      Collection: true,
    },
  });

  if (!!!custom_video) notFound();

  const collection = await prisma.collection.findFirst({
    where: {
      Id: custom_video?.CollectionId,
    },
    include: {
      Videos: {
        include: {
          Photo: {
            include: {
              Photo: true,
            },
          },
        },
      },
      Attendees: true,
      Photo: true,
      Teacher: {
        include: {
          Followers: true,
        },
      },
      SavedByUsers: true,
    },
  });

  const x_user = (await get_xUser(headers)) as x_user;
  const isSavedCollection = !!collection?.SavedByUsers.find(
    (x) => x.UserId == x_user.userId,
  );

  return (
    <div className="mx-auto max-w-screen-container">
      {collection && (
        <div className="grid grid-cols-3 gap-2 lg:gap-5 lg:py-6">
          <div className="rtl col-span-3 row-start-3 px-1 lg:col-span-1 lg:row-start-1">
            <CollectionVideos
              collection={collection}
              isCollectionSaved={isSavedCollection}
            />
          </div>
          <div className="col-span-3 lg:col-span-2">
            <Player inputVideoId={videoId} />
            <VideoInfo
              video={custom_video}
              teacher={collection?.Teacher.FullName}
              teacherId={collection.TeacherId}
              followersCount={collection.Teacher.Followers.length}
            />
          </div>
        </div>
      )}
    </div>
  );
}
