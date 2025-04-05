import { NextResponse } from "next/server";
import { UploadService } from "@/lib/services/upload.service";
import { prisma } from "@/lib/db/db";
import { addNewCollection } from "@/lib/db/queries/collection.query";

export async function create_new_collection(formData: FormData) {
  const rawData = {
    ShortId: "dfadfa",
    Title: formData.get("Title") as string,
    Cost: formData.get("Cost") as string,
    DisCount: formData.get("DisCount") as string,
    Description: formData.get("Description") as string,
    IsActive: true,
    TeacherId: formData.get("teacherId") as string,
    TeacherPhone: formData.get("TeacherPhone") as string,
    file: formData.get("file"),
  };

  const teacher = await prisma.teacher.findUnique({
    where: { Id: rawData.TeacherId },
  });

  console.log("founded teacher is: ", teacher);

  if (!teacher) {
    return NextResponse.json(
      { error: "مدرس دوره را مشخص کنید" },
      { status: 400 }
    );
  }

  if (!(rawData.file instanceof Blob)) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  try {
    const upload_service = new UploadService();
    const upload_result = await upload_service.upload(
      rawData.file,
      "collection"
    );
    rawData.ShortId = upload_result.shortId;
    
    const result = addNewCollection(
      rawData,
      `/uploads/collection/${upload_result.fileName}`
    );

    return NextResponse.json({
      success: true,
      data: result,
      path: upload_result.filePath,
    });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
