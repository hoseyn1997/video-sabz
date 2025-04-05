"use client";
import React from "react";
import { Teacher } from "@prisma/client";
import { Icons } from "@/app/components/ui/icons/Icons";
import { useModal } from "@/lib/contexts/modalContext";
import AddCollection from "./add_collection";

interface Props {
  teacher: Teacher;
}

const AddPCollectionButton = ({ teacher }: Props) => {
  const { openModal } = useModal();
  return (
    <button
      onClick={() => openModal(<AddCollection teacherId={teacher.Id} />)}
      className="text-xs flex justify-start items-center gap-2 rounded ring-[0.5px] ring-gray-400 w-fit p-2 justify-self-end"
    >
      <Icons.add_image className="w-3" />
      افزودن کالکشن
    </button>
  );
};

export default AddPCollectionButton;
