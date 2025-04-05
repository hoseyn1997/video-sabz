import { prisma } from "@/lib/db/db";
import { x_user } from "@/lib/types/user";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const teacherId = searchParams.get("teacherId");

  // teahcer
  const teacher = await prisma.teacher.findFirst({
    where: {
      Id: teacherId || "",
    },
  });
  if (!teacher || !teacherId) {
    return NextResponse.json(
      { message: "teacher not-found!" },
      { status: 404 },
    );
  }

  // XUser
  const XUser = JSON.parse(request.headers.get("x-user")!) as x_user;
  let user = await prisma.user.findUnique({
    where: {
      Id: XUser.userId,
    },
  });
  if (user?.UserName !== "admin" || user?.Role === "admin" || !user) {
    return NextResponse.json(
      {
        message: "access denied or user not-found",
      },
      { status: 401 },
    );
  }
  try {
    const delete_result = await prisma.teacher.delete({
      where: {
        Id: teacherId,
      },
    });
    return NextResponse.json(
      {
        message: "removed successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "something went wrong",
      },
      { status: 500 },
    );
  }
}
