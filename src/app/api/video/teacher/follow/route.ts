import { prisma } from "@/lib/db/db";
import { x_user } from "@/lib/types/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);

  const teacherId = searchParams.get("teacherId");
  const teacher = await prisma.teacher.findUnique({
    where: {
      Id: teacherId || "",
    },
  });
  if (!teacher) {
    return NextResponse.json({ message: "teacher not found" }, { status: 500 });
  }

  //current_user
  const xUser = JSON.parse(request.headers.get("x-user")!) as x_user;
  const user = await prisma.user.findUnique({
    where: {
      Id: xUser.userId || "",
    },
  });

  if (!xUser || !!!user?.Id) {
    return NextResponse.json(
      {
        message: "user is not logged in.",
      },
      { status: 401 },
    );
  }

  try {
    let Follow = await prisma.teacherFollow.findFirst({
      where: {
        TeacherId: teacher.Id,
        UserId: user.Id,
      },
    });
    if (!Follow) {
      await prisma.teacherFollow.create({
        data: {
          TeacherId: teacher.Id,
          UserId: user.Id,
        },
      });
    } else {
      await prisma.teacherFollow.delete({
        where: {
          Id: Follow.Id,
        },
      });
    }
    return NextResponse.json(
      {
        teacher_id: teacherId,
        user_id: xUser.userId,
        isFollowed: !Follow ? true : false,
        message: "followed successfully",
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
