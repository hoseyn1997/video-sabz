import { prisma } from "@/lib/db/db";
import { x_user } from "@/lib/types/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // video_id
  const videoId = searchParams.get("videoId");
  const video = await prisma.video.findUnique({
    where: {
      Id: videoId ? videoId : "",
    },
    include: {
      Collection: {
        include: {
          Teacher: true,
        },
      },
      LikedByUsers:true,
      SavedByUsers:true
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
    include: {
      LikedVideos: true,
      SavedVideos: true,
      FollowedTeachers: true,
    },
  });

  if (!xUser || !!!user?.Id) {
    return NextResponse.json({
      isLiked: false,
      isSaved: false,
      isTeacherFollowed: false,
      isSeen: false,
      message: "user is not logged in.",
    });
  }

  return NextResponse.json({
    isLiked: !!user.LikedVideos.find((x) => x.VideoId === videoId),
    isSaved: !!user.SavedVideos.find((x) => x.VideoId === videoId),
    isTeacherFollowed: !!user.FollowedTeachers.find(
      (x) => x.TeacherId === video.Collection.Teacher.Id,
    ),
    isSeen: true,
    message:"success"
  });
}
