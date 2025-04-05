import { prisma } from "@/lib/db/db";
import { x_user } from "@/lib/types/user";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
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
    const result = await prisma.video.delete({
      where: {
        Id: video.Id,
      },
    });
    return NextResponse.json(
      { message: "successfully deleted!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "something went wrong here..." });
  }
}
