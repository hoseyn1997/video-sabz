import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const ITEMS_PER_PAGE = Number(searchParams.get("ITEMS_PER_PAGE")) || 2;

  const videos = await prisma.video.findMany({
    take: ITEMS_PER_PAGE,
    skip: page * ITEMS_PER_PAGE,
    orderBy: { CreatedAt: "desc" },
    include: {
      Collection: {
        include: {
          Photo: {
            include: {
              Photo: true,
            },
          },
          Teacher: {
            include: {
              Photo: {
                include: {
                  Photo: true,
                },
              },
            },
          },
        },
      },
      Photo: {
        include: {
          Photo: true,
        },
      },
    },
  });

  return NextResponse.json(videos);
}
