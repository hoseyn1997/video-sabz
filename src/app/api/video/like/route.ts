import { prisma } from "@/lib/db/db";
import { x_user } from "@/lib/types/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);

  // video_id
  const videoId = searchParams.get("videoId");
  const video = await prisma.video.findUnique({
    where: {
      Id: videoId ? videoId : "",
    },
  });
  if (!video)
    return NextResponse.json({ message: "video not-found" }, { status: 500 });

  //current_user
  const xUser = JSON.parse(request.headers.get("x-user")!) as x_user;
  const user = await prisma.user.findUnique({
    where: {
      Id: xUser ? xUser.userId : "",
    },
  });
  if (!user)
    return NextResponse.json({ message: "user not-found" }, { status: 500 });

  try {
    let Like = await prisma.videoLike.findFirst({
      where: {
        VideoId: videoId!,
        UserId: xUser.userId,
      },
    });
    if (Like === null) {
      await prisma.videoLike.create({
        data: {
          VideoId: videoId!,
          UserId: xUser.userId!,
        },
      });
    } else {
      await prisma.videoLike.delete({
        where: {
          Id: Like.Id,
        },
      });
    }

    return NextResponse.json(
      {
        video_id: videoId,
        user_id: xUser.userId,
        disliked: !!Like ? true : false,
        message: "video liked successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "there was an error. try again" },
      { status: 500 },
    );
  }
}
