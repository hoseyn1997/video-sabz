"use client";
import { Icons } from "@/app/components/ui/icons/Icons";
import { useModal } from "@/lib/contexts/modalContext";
import React from "react";
import VideoUploadForm from "./upload_video";
import { Collection } from "@prisma/client";

interface Props {
  collection: Collection;
}

const AddVideoButton = ({ collection }: Props) => {
  const { openModal } = useModal();
  return (
    <button
      onClick={() => openModal(<VideoUploadForm collection={collection} />)}
      className="text-xs flex justify-start items-center gap-2 rounded ring-[0.5px] ring-gray-400 w-fit p-2 self-end"
    >
      <Icons.clapperboard className="w-3" />
      <span>افزودن ویدئو</span>
    </button>
  );
};

export default AddVideoButton;
