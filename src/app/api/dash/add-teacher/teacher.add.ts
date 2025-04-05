import { NextResponse } from "next/server";
import { createTeacher } from "@/lib/db/queries/teacher.query";
import { UploadService } from "@/lib/services/upload.service";
import { prisma } from "@/lib/db/db";

export async function create_new_teacher(formData: FormData) {
  const rawData = {
    FName: formData.get("fName") as string,
    LName: formData.get("lName") as string,
    FullName: "",
    Bio: formData.get("bio") as string,
    ContactPhone: formData.get("phone") as string,
    ContactEmail: formData.get("email") as string,
    IsActive: true,
    file: formData.get("file"),
  };
  rawData.FullName = rawData.FName + " " + rawData.LName;

  let isTeacherExists = !!(await prisma.teacher.findFirst({
    where: {
      ContactEmail: rawData.ContactEmail,
    },
  }));

  if (!isTeacherExists)
    isTeacherExists = !!(await prisma.teacher.findFirst({
      where: {
        ContactPhone: rawData.ContactPhone,
      },
    }));
  if (isTeacherExists) {
    return NextResponse.json(
      { error: "فردی با این اطلاعات تماس یا ایمیل قبلا وجود دارد" },
      { status: 400 }
    );
  }

  if (!(rawData.file instanceof Blob)) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  try {
    const upload_service = new UploadService();
    const upload_result = await upload_service.upload(rawData.file, "teacher");
    const create_result = await createTeacher(
      rawData,
      `/uploads/teacher/${upload_result.fileName}`
    );
    return NextResponse.json({
      success: true,
      data: create_result,
      path: upload_result.filePath,
    });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
