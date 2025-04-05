import { NextResponse } from "next/server";
import { UploadService } from "@/lib/services/upload.service";
import { prisma } from "@/lib/db/db";
import { addVideo } from "@/lib/db/queries/video.query";

export async function add_collection_video(formData: FormData) {
  const rawData = {
    IsFree: true,
    Title: formData.get("Title") as string,
    Description: formData.get("Description") as string,
    Order: Number(formData.get("Order")),
    CollectionId: formData.get("CollectionId") as string,
    videoFile: formData.get("video_file"),
    ImageFile: formData.get("photo_file"),
  };

  let collection = await prisma.collection.findUnique({
    where: {
      Id: rawData.CollectionId,
    },
  });

  if (!collection) {
    return NextResponse.json(
      { error: "کالکشن مد نظر یافت نشد" },
      { status: 400 }
    );
  }

  if (
    !(rawData.videoFile instanceof Blob) ||
    !(rawData.ImageFile instanceof Blob)
  ) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  try {
    const upload_service = new UploadService();

    // upload image
    const photo_upload_result = await upload_service.upload(
      rawData.ImageFile,
      "video"
    );
    console.log("video.add.ts photo_upload_result", photo_upload_result);
    const video_upload_result = await upload_service.uploadVideo(
      rawData.videoFile,
      photo_upload_result.shortId
    );
    console.log("video.add.ts video_upload_result", video_upload_result);
    const createVideoResult = await addVideo(
      {
        Title: rawData.Title,
        Order: rawData.Order,
        IsFree: rawData.IsFree,
        Description: rawData.Description,
        ShortId: photo_upload_result.shortId,
        CollectionId: rawData.CollectionId,
      },
      video_upload_result.filePath,
      photo_upload_result.filePath || ""
    );
    console.log("video.add.ts createVideoResult", createVideoResult);
    return NextResponse.json({
      success: true,
      data: createVideoResult,
      path: video_upload_result.filePath,
    });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
