import { prisma } from "@/lib/db/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // video_id
  const videoId = searchParams.get("videoId");
  if (!videoId)
    return NextResponse.json({ message: "videoId not-found" }, { status: 500 });

  const video = await prisma.video.findUnique({
    where: {
      Id: videoId,
    },
  });
  if (!video)
    return NextResponse.json({ message: "video not-found" }, { status: 500 });

  const comments = await prisma.comment.findMany({
    where: {
      VideoId: videoId!,
    },
  });
  return NextResponse.json({ comments: comments }, { status: 200 });
}
