import { teacher } from "@/lib/types/teacher";
import { prisma } from "../db";
import { Teacher } from "@prisma/client";
import { UploadResult } from "@/lib/types/photo";

export async function createTeacher(teacher: teacher, inputPhotoPath = "") {
  const creation_result: Teacher = await prisma.teacher.create({
    data: {
      FName: teacher.FName,
      LName: teacher.LName,
      FullName: teacher.FullName,
      Bio: teacher.Bio,
      ContactPhone: teacher.ContactPhone,
      ContactEmail: teacher.ContactEmail,
      IsActive: true,
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

  return creation_result;
}

export async function listTeachers() {
  return (await prisma.teacher.findMany({
    include: {
      Photo: {
        include: {
          Photo: true,
        },
      },
    },
  })) ;
}

export async function getTeacher(id: string): Promise<Teacher | null> {
  return (await prisma.teacher.findUnique({
    where: {
      Id: id,
    },
  })) as Teacher;
}

export async function updateTeacherPhoto(
  teacherId: string,
  uploadResult: UploadResult
): Promise<Teacher | null> {
  return await prisma.teacher.update({
    where: { Id: teacherId },
    data: {
      Photo: {
        create: {
          Photo: {
            create: {
              FilePath: uploadResult.data?.filePath || "",
            },
          },
        },
      },
    },
  });
}
