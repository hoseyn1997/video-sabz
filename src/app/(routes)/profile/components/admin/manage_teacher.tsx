"use client";
import { Icons } from "@/app/components/ui/icons/Icons";
import AddPhotoButton from "./add_photo_button";
import AddPCollectionButton from "./add_collection_button";
import Image from "next/image";
import { teacher_with_photo } from "@/lib/types/teacher";
import useDashStore from "@/lib/stores/dashStore";
import { useModal } from "@/lib/contexts/modalContext";
import Loading from "@/app/components/ui/loader/loading";
import { ManageTeacherDelete } from "./manage_teacher_deletion";

interface Props {
  teacher: teacher_with_photo;
}

export function ManageTeacher({ teacher }: Props) {
  const { openModal } = useModal();
  return (
    <div key={teacher.Id} className="grid gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 p-2">
          <Image
            src={teacher.Photo?.Photo.FilePath || "/assets/tc1.webp"}
            alt={teacher.FullName}
            width={50}
            height={50}
            className="aspect-square w-12 rounded-full"
          />
          <div className="flex flex-col justify-center gap-1 text-xs font-thin">
            <p>{teacher.FullName}</p>
            <p>{teacher.ContactEmail}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() =>
              openModal(<ManageTeacherDelete teacherId={teacher.Id} />)
            }
            className="group flex h-6 w-6 items-center justify-center rounded-full transition-all hover:bg-gray-100 dark:hover:bg-gray-400/40"
          >
            <Icons.trash className="w-3 group-hover:stroke-red-500" />
          </button>
          <button className="group flex h-6 w-6 items-center justify-center rounded-full transition-all hover:bg-gray-100 dark:hover:bg-gray-400/40">
            <Icons.settings className="w-3 group-hover:stroke-teal-500" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <div className="rounded-full bg-gray-200 p-1 dark:bg-gray-500">
          <Icons.phone className="w-3" />
        </div>
        <p>{teacher.ContactPhone}</p>
      </div>
      <div className="flex items-start gap-2 text-xs">
        <div className="rounded-full bg-gray-200 p-1 dark:bg-gray-500">
          <Icons.comment className="w-3" />
        </div>
        <p>{teacher.Bio}</p>
      </div>
      <div className="flex items-center justify-end gap-2">
        <AddPhotoButton teacher={teacher} />
        <AddPCollectionButton teacher={teacher} />
      </div>
    </div>
  );
}
