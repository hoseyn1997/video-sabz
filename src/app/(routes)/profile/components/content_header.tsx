import { Icons } from "@/app/components/ui/icons/Icons";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  SearchParameters_admin,
  SearchParameters_user,
} from "@/app/(routes)/profile/components/dashboard";

interface Props {
  username: string;
  searchParameters: SearchParameters_admin | SearchParameters_user;
}

const ContentHeader = ({ username, searchParameters }: Props) => {
  return (
    <div className="mx-auto flex w-full items-center justify-between gap-5 md:w-3/5">
      <Link
        href={`/profile/${username}?tab=${searchParameters.tab}&content=${
          searchParameters.content
        }&menue=${searchParameters.menue == "true" ? "false" : "true"}`}
        className="flex aspect-square h-10 w-10 items-center justify-center duration-300 rounded-full transition-all hover:bg-gray-100 dark:hover:bg-gray-50/20"
      >
        <Icons.menu className="w-7" />
      </Link>
      <div className="flex w-full items-center rounded-xl bg-gray-100/70 p-1 pr-5 shadow-[0px_0px_2px_#8080802b] dark:bg-[#292b30] md:p-1.5">
        <button className="group flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-gray-100 dark:hover:bg-dark">
          <Icons.search className="w-5 stroke-current" />
        </button>
        <input
          type="text"
          placeholder="اینجا سرچ کن..."
          className="rtl w-full bg-transparent p-1 text-sm text-gray-300 placeholder:text-xs placeholder:text-gray-400 focus-visible:outline-none dark:placeholder:text-gray-300/60 md:p-1.5"
        />
      </div>
      <Image
        src="/assets/tc1.webp"
        alt="video-sabz"
        width={80}
        height={80}
        className="aspect-square w-10 rounded-full bg-gradient-to-r from-teal-100 via-teal-400 to-teal-500"
      />
    </div>
  );
};

export default ContentHeader;
