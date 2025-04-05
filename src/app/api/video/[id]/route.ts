// src/app/api/video/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
// import { verify } from "jsonwebtoken";

interface Props {
  params: Promise<{ id: string }>; // Expect params to be a Promise
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
export async function GET(request: NextRequest, { params }: Props) {
  // get the videoid
  const resolvedParams = await params; // Resolve the Promise
  const videoShortId = resolvedParams.id;

  const range = request.headers.get("range");
  if (!range) {
    return new NextResponse("Requires Range header", { status: 400 });
  }

  // Path to your video file
  const videoPath = path.join(process.cwd(), "videos", `${videoShortId}.mp4`);
  const videoSize = fs.statSync(videoPath).size;

  // Parse the range header
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // if (end >= videoSize / 2) {
  //   const token = request.cookies.get("token")?.value;
  //   if (!token) return new NextResponse("Requires Token", { status: 401 });
  //   try {
  //     const encodedToken = verify(token, JWT_SECRET);
  //     console.log("you can stream the video");
  //   } catch (error) {
  //     console.log("you are not logged in.");
  //     return new NextResponse("Requires Valid Token", { status: 401 });
  //   }
  // }

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength.toString(),
    "Content-Type": "video/mp4",
  };

  // Create a read stream for the video chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Return a streaming response
  return new NextResponse(videoStream as any, {
    status: 206,
    headers: new Headers(headers),
  });
}
