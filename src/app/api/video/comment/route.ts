import { prisma } from "@/lib/db/db";
import { x_user } from "@/lib/types/user";
import { NextResponse } from "next/server";

export async function POST(request: Request, commentBody: string) {
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

  const data = await request.json();
  try {
    let result = await prisma.comment.create({
      data: {
        Text: data.body,
        IsApproved: true,
        UserId: xUser.userId,
        VideoId: video.Id,
      },
    });
    return NextResponse.json(result);
    // return NextResponse.json(
    //   { message: "every thing is working ok." },
    //   { status: 200 },
    // );
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 },
    );
  }
}
