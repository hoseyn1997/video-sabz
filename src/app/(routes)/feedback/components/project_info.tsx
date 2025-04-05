"use client";
import React from "react";
import { Icons } from "@/app/components/ui/icons/Icons";
import Image from "next/image";

const ProjectInfo = () => {
  return (
    <div>
      <section className="project-info relative grid gap-3 shadow-[0px_0.5px_0px_0px_#9ca3af] p-3 lg:p-5 pb-5">
        <div className="flex items-center gap-3">
          <Image
            src="/logo192.png"
            alt="video-sabz"
            width={50}
            height={50}
            className="w-14 aspect-square bg-gray-100 dark:bg-gray-100/30 p-0 rounded-xl"
          />
          <div className="self-end">
            <p className="text-lg font-bold">ویدیو سبز</p>
            <span className="text-xs text-gray-400">
              سرویس پخش و اشتراک ویدئو
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="ring-[0.5px] ring-yellow-500 rounded-full px-2 py-0.5 pt-1 text-xs text-yellow-500">
            Next js
          </span>
          <span className="ring-[0.5px] rounded-full ring-teal-500 px-2 py-0.5 pt-1 text-xs text-teal-500">
            Postgresql
          </span>
          <span className="ring-[0.5px] rounded-full ring-blue-500 px-2 py-0.5 pt-1 text-xs text-blue-500">
            typescript
          </span>
          <div className="relative flex items-center w-fit gap-2 text-xs text-gray-400 font-bold group h-6">
            <Icons.github className="w-5 bg-gray-100/50 p-0.5 rounded" />
            <div className="hidden group-hover:flex absolute -top-8 -right-5 bg-white dark:bg-gray-800 z-10 shadow-[0px_0px_1px_0px_gray] gap-3 rounded-full px-2 py-2">
              {/* <p className="max-w-48 truncate overflow-hidden">
                https://github.com/dashboard/hoseyn1997/doctor-sabz
              </p> */}
              <button>
                <Icons.copy className="w-4 stroke-gray-300 block rounded" />
              </button>
              <button>
                <Icons.link className="w-4 stroke-gray-300 block rounded" />
              </button>
            </div>
          </div>
          <div className="relative flex items-center w-fit gap-2 text-xs text-gray-400 font-bold group h-6">
            <Icons.email className="w-5 bg-gray-100/50 p-0.5 rounded stroke-black/60" />
            <div className="hidden group-hover:flex absolute -top-8 -right-5 bg-white dark:bg-gray-800 z-10 shadow-[0px_0px_1px_0px_gray] gap-3 rounded-full px-2 py-2">
              {/* <p className="max-w-48 truncate overflow-hidden">
                hosein1252212@gmail.com
              </p> */}
              <button>
                <Icons.copy className="w-4 stroke-gray-300 block group-hover:block rounded" />
              </button>
              <button>
                <Icons.link className="w-4 stroke-gray-300 block group-hover:block rounded" />
              </button>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-wrap gap-3">
          
        </div> */}
        <div className="grid gap-3">
          <p className="text-justify text-gray-600 dark:text-gray-50 text-sm">
            به طور کلی، این برنامه پخش ویدیو نه تنها مهارت های جلویی من را نشان
            می دهد، بلکه بر توانایی من برای ایجاد یک تجربه کاربری بصری نیز تأکید
            می کند. من مشتاق بهبود مستمر عملکرد بر اساس بازخورد کاربر هستم و از
            کشف ویژگی‌های بیشتر مانند پخش جریان بیت تطبیقی ​​و گزینه‌های دسترسی
            بهبودیافته هیجان‌زده هستم. به طور کلی، این برنامه پخش ویدیو نه تنها
            مهارت های جلویی من را نشان می دهد، بلکه بر توانایی من برای ایجاد یک
            تجربه کاربری بصری نیز تأکید می کند.
          </p>
          <div className="flex flex-wrap gap-2 justify-start">
            <Icons.next_js className="w-14 bg-gray-100 dark:bg-gray-50/60 p-1.5 rounded-xl" />
            <Icons.typescript className="w-14 bg-gray-100 dark:bg-gray-50/60 p-1.5 rounded-xl" />
            <Icons.react_js className="w-14 bg-gray-100 dark:bg-gray-50/60 p-1.5 rounded-xl" />
            <Icons.tailwind className="w-14 bg-gray-100 dark:bg-gray-50/60 p-1.5 rounded-xl" />
            <Icons.postgres className="w-14 bg-gray-100 dark:bg-gray-50/60 p-1.5 rounded-xl" />
            <Icons.docker className="w-14 bg-gray-100 dark:bg-gray-50/60 p-1.5 rounded-xl" />
            <Image
              src={"/assets/zustand.jpg"}
              alt="zustand"
              width={56}
              height={56}
              className="w-14 bg-gray-100 dark:bg-gray-50/60 p-1.5 rounded-xl object-cover"
            />
            <div className="grid grid-cols-2 gap-0.5 hover:scale-[2] hover:bg-white/95 transition-all rounded items-center p-0.5 group hover:ring-1 ring-gray-200 dark:ring-0">
              <Icons.git className="w-6 bg-gray-100 dark:bg-gray-50/60 p-0.5 rounded group-hover:bg-white/0" />
              <Icons.github className="w-6 bg-gray-100 dark:bg-gray-50/60 p-0.5 rounded group-hover:bg-white/0" />
              <Icons.javascript className="w-6 bg-gray-100 dark:bg-gray-50/60 p-0.5 rounded group-hover:bg-white/0" />
              <Icons.node_js className="w-6 bg-gray-100 dark:bg-gray-50/60 p-0.5 rounded group-hover:bg-white/0" />
            </div>
            <div className="grid grid-cols-2 gap-0.5 hover:scale-[2] hover:bg-white/95 transition-all rounded items-center p-0.5 group hover:ring-1 ring-gray-200 dark:ring-0">
              <Icons.html className="w-6 bg-gray-100 dark:bg-gray-50/60 p-0.5 rounded group-hover:bg-white/0" />
              <Icons.vscode className="w-6 bg-gray-100 dark:bg-gray-50/60 p-0.5 rounded group-hover:bg-white/0" />
              <Icons.css className="w-6 bg-gray-100 dark:bg-gray-50/60 p-0.5 rounded group-hover:bg-white/0" />
            </div>
          </div>
        </div>

        {/* <button className="bg-gray-300/20 rounded-full p-1 w-fit absolute left-0 right-0 mx-auto -bottom-3 shadow-[0px_0px_1px_0px_#9ca3af]">
          <Icons.arrow_left className="w-4 stroke-current -rotate-90" />
        </button> */}
      </section>
    </div>
  );
};

export default ProjectInfo;
