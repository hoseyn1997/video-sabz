"use client";
import React from "react";
import { Icons } from "../../../components/ui/icons/Icons";
import useUserStore from "@/lib/stores/userStore";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const { logOut } = useUserStore();
  const router = useRouter();
  return (
    <button
      onClick={() => logOut().then(() => router.push("/"))}
      className="flex items-center gap-2 cursor-pointer"
    >
      <Icons.logout className="w-6 stroke-gray-500 stroke-2" />
      <span className="text-lg hidden md:flex text-gray-500 dark:text-gray-400 font-[500]">خروج</span>
    </button>
  );
};

export default LogOut;
