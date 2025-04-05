import { prisma } from "@/lib/db/db";
import { x_user } from "@/lib/types/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);

  // collectionId
  const collectionId = searchParams.get("collectionId");
  const collection = await prisma.collection.findUnique({
    where: {
      Id: collectionId ? collectionId : "",
    },
  });
  if (!collection)
    return NextResponse.json(
      { message: "collection not-found" },
      { status: 500 },
    );

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
    let Save = await prisma.collectionSave.findFirst({
      where: {
        CollectionId: collection.Id,
        UserId: xUser.userId,
      },
    });
    if (Save === null) {
      await prisma.collectionSave.create({
        data: {
          CollectionId: collectionId!,
          UserId: xUser.userId!,
        },
      });
    } else {
      await prisma.collectionSave.delete({
        where: {
          Id: Save.Id,
        },
      });
    }

    return NextResponse.json(
      {
        collectionId: collectionId,
        user_id: xUser.userId,
        message: "collection saved successfully",
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
