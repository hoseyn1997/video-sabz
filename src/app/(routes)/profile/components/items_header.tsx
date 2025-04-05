import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/app/components/ui/icons/Icons";
import { SearchParameters_admin, SearchParameters_user } from "@/app/(routes)/profile/components/dashboard";

interface Props {
  username: string;
  searchParameters: SearchParameters_admin | SearchParameters_user;
}

const ItemsHeader = ({ username, searchParameters }: Props) => {
  return (
    <div className="flex items-center gap-3 mb-10 md:px-3">
      <Image
        src="/logo192.png"
        alt="video-sabz"
        width={50}
        height={50}
        className="w-12 hidden md:block md:w-14 aspect-square bg-gray-100 dark:bg-gray-100/30 p-0 rounded-xl"
      />
      <Link
        href={`/profile/${username}?tab=${searchParameters.tab}&content=${
          searchParameters.content
        }&menue=${searchParameters.menue == "true" ? "false" : "true"}`}
        className="block md:hidden mx-auto"
      >
        <Icons.menu className="w-7" />
      </Link>
      <div className="self-end hidden md:block">
        <p className="text-lg font-bold">ویدیو سبز</p>
        <span className="text-xs hidden md:flex text-gray-400">
          سرویس پخش و اشتراک ویدئو
        </span>
      </div>
    </div>
  );
};

export default ItemsHeader;
