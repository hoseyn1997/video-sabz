import { collectionItems } from "@/lib/types/collection";
import { prisma } from "../db";

export async function addNewCollection(
  collection: collectionItems,
  inputPhotoPath = ""
) {
  return await prisma.collection.create({
    data: {
      Cost: collection.Cost,
      DisCount: collection.DisCount,
      Description: collection.Description,
      ShortId: collection.ShortId,
      Title: collection.Title,
      Category: collection.Category || "",
      IsActive: collection.IsActive,
      Level: collection.Level,
      Score: collection.Score,
      TeacherId: collection.TeacherId,
      Photo: {
        create: {
          Photo: {
            create: {
              FilePath: inputPhotoPath,
            },
          },
        },
      },
    },
  });
}
