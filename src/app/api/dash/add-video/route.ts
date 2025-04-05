import { NextRequest } from "next/server";
import { add_collection_video } from "./video.add";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  return await add_collection_video(formData);
}
