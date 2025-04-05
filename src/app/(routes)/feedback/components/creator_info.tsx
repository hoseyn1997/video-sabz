"use client";
import React from "react";
import { Icons } from "@/app/components/ui/icons/Icons";
import Link from "next/link";
import Image from "next/image";

const CreatorInfo = () => {
  return (
    <section className="creator-info relative grid gap-3 shadow-[0px_0.5px_0px_0px_#9ca3af] p-3 lg:p-5 pb-5 mt-2">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/tc1.webp"
          alt="video-sabz"
          width={100}
          height={100}
          className="bg-gradient-to-r from-teal-100 via-teal-400 to-teal-500 rounded-full aspect-square"
        />
        <div className="self-end">
          <p className="text-lg font-bold">حسین عباسی</p>
          <span className="text-xs text-gray-400">Junior Front-End</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="flex items-center justify-center gap-1 ring-[0.5px] ring-yellow-500 rounded-full px-2 pl-1 py-0.5 pt-[2.5px] text-xs text-yellow-500">
          NextJs{" "}
          <Icons.next_js className="w-6 dark:bg-gray-50 bg-gray-200/60 rounded-[30px_5px_5px_30px] p-0.5" />
        </span>
        <span className="flex items-center justify-center gap-1 ring-[0.5px] rounded-full ring-teal-500 px-2 pl-1 py-0.5 pt-[2.5px] text-xs text-teal-500">
          ReactJs
          <Icons.react_js className="w-6 dark:bg-gray-50 bg-gray-200/60 rounded-[30px_5px_5px_30px] p-0.5" />
        </span>
        <span className="flex items-center justify-center gap-1 ring-[0.5px] rounded-full ring-blue-500 px-2 pl-1 py-0.5 pt-[2.5px] text-xs text-blue-500">
          Asp .Net Core
          <Icons.node_js className="w-6 dark:bg-gray-50 bg-gray-200/60 rounded-[30px_5px_5px_30px] p-0.5" />
        </span>
        <Link
          href={"/"}
          className="bg-gray-50 rounded-full p-2 hover:scale-110 transition-all"
          target="blank"
          content="linkding"
        >
          <Icons.linkdin className="w-5" />
        </Link>
        <Link
          href={"/"}
          className="bg-gray-50 rounded-full p-2 hover:scale-110 transition-all"
          target="blank"
        >
          <Icons.email className="w-5 stroke-black" />
        </Link>
        <Link
          href={"/"}
          className="bg-gray-50 rounded-full p-2 hover:scale-110 transition-all"
          target="blank"
        >
          <Icons.github className="w-5" />
        </Link>
        <Link
          href={"https://knowledgland.ir"}
          className="relative rounded-full p-2 hover:scale-110 transition-all ring-1 ring-teal-500 scale-110"
          target="blank"
        >
          <Image
            src={"/assets/knowledgland.ir.webp"}
            alt="knowledgland.ir"
            className="w-5 scale-125"
            width={20}
            height={20}
          />
          <span className="absolute -bottom-1.5 -left-0.5 text-[7px] bg-white dark:bg-gray-800 text-teal-500 rounded p-0.5">project</span>
        </Link>
      </div>
      <p className="text-justify text-gray-600 dark:text-gray-50 text-sm">
        به طور کلی، این برنامه پخش ویدیو نه تنها مهارت های جلویی من را نشان می
        دهد، بلکه بر توانایی من برای ایجاد یک تجربه کاربری بصری نیز تأکید می
        کند. من مشتاق بهبود مستمر عملکرد بر اساس بازخورد کاربر هستم و از کشف
        ویژگی‌های بیشتر مانند پخش جریان.
      </p>
    </section>
  );
};

export default CreatorInfo;
