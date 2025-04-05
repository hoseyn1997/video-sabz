"use client";
import React from "react";
import { Teacher } from "@prisma/client";
import { Icons } from "@/app/components/ui/icons/Icons";

interface Props {
  teacher: Teacher;
}

const AddPhotoButton = ({ teacher }: Props) => {
  return (
    <button
      onClick={() => console.log(teacher)}
      className="text-xs flex justify-start items-center gap-2 rounded ring-[0.5px] ring-gray-400 w-fit p-2 justify-self-end"
    >
      <Icons.add_image className="w-3" />
      ویرایش تصویر مدرس
    </button>
  );
};

export default AddPhotoButton;
