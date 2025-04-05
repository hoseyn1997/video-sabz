import { video } from "@/lib/types/video";
import { prisma } from "../db";

export async function addVideo(
  video: video,
  filePath: string,
  imagePath: string
) {
  return await prisma.video.create({
    data: {
      Title: video.Title,
      Order: video.Order,
      Description: video.Description,
      FilePath: filePath || "",
      ShortId: video.ShortId,
      IsFree: video.IsFree,
      CollectionId: video.CollectionId,
      Photo: {
        create: {
          Photo: {
            create: {
              FilePath: imagePath,
            },
          },
        },
      },
    },
  });
}
