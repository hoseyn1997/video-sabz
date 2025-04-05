"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Icons } from "../ui/icons/Icons";
import NavUserSettings from "./navUserSettings";

export default function Navbar() {
  const [sideBar, setSideBar] = useState(false);
  const side_bar = useRef<HTMLDivElement>(null);
  const shadowPage = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (sideBar) {
      side_bar.current?.classList.remove("-right-64");
      side_bar.current?.classList.add("right-0");

      shadowPage.current?.classList.remove("hidden");
      shadowPage.current?.classList.add("opacity-50");
      shadowPage.current?.classList.remove("opacity-0");
      setTimeout(() => {
        shadowPage.current?.classList.add("block");
      }, 200);
    } else {
      side_bar.current?.classList.add("-right-64");
      side_bar.current?.classList.remove("right-0");

      shadowPage.current?.classList.remove("block");
      shadowPage.current?.classList.remove("opacity-50");
      shadowPage.current?.classList.add("opacity-0");
      setTimeout(() => {
        shadowPage.current?.classList.add("hidden");
      }, 200);
    }
  }, [sideBar]);

  return (
    <>
      <div className="nav-bar bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed left-0 right-0 top-0 z-50 mx-auto w-full bg-white shadow-[0px_1px_0px_0px_#8080802b] backdrop-blur dark:bg-dark dark:shadow-[0px_1px_0px_0px_#8080805e]">
        <div className="mx-auto flex h-16 max-w-[1536px] items-center justify-between px-3 md:px-9">
          <div className="inline-flex gap-1 xl:w-64">
            <NavUserSettings />
            <button
              onClick={() =>
                theme == "dark" ? setTheme("light") : setTheme("dark")
              }
              className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-gray-100 dark:hover:bg-gray-400/40"
            >
              <Icons.moon className="w-4 stroke-current stroke-[2px] dark:stroke-gray-100" />
            </button>
          </div>
          <div className="relative hidden w-[248px] md:w-[300px] lg:block lg:w-[490px]">
            <input
              className="rtl w-full rounded-xl bg-gray-100/70 px-5 py-3 text-sm text-gray-500 transition-all hover:shadow-[0px_0px_2px_0px_gray] focus-visible:outline-none dark:bg-[#292b30] dark:hover:shadow-[0px_0px_2px_0px_#fff]"
              placeholder="جستجوی ویدئو در سایت"
            />
            <button className="group absolute left-1 top-1.5 flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-gray-100 dark:hover:bg-dark">
              <Icons.search className="w-4 rounded-full stroke-current dark:group-hover:stroke-gray-100" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-100">
            <Link
              href={"/feedback"}
              className="flex items-center gap-1 rounded-full bg-red-50 p-2 text-xs dark:bg-black dark:text-gray-50 dark:shadow-[0px_0px_0.5px_0.5px_gray]"
            >
              <span>نظرت رو بگو</span>
              <Icons.rocket className="w-4 animate-pulse stroke-red-500" />
            </Link>
            <Link href={"/about"} className="hidden min-w-max md:block">
              درباره ما
            </Link>
            <Link href={"/news"} className="hidden min-w-max md:block">
              تازه ها
            </Link>
            <Link href={"/blog"} className="hidden min-w-max md:block">
              مجله ویدیو سبز
            </Link>
            <Link href={"/"} className="hidden min-w-max md:block">
              خانه
            </Link>
            <button
              onClick={() => setSideBar(!sideBar)}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-gray-100 dark:hover:bg-gray-400/40"
            >
              <Image
                className="float-right hidden w-10 scale-150 rounded-full md:block"
                src="/logo192.png"
                alt="myIcon"
                width={40}
                height={40}
                priority
              />
              <Icons.grip className="w-4 stroke-current dark:stroke-gray-100 md:hidden" />
            </button>
          </div>
        </div>
      </div>
      <div
        ref={side_bar}
        className="rtl fixed -right-64 top-16 z-30 flex h-full flex-col bg-white px-3 py-5 transition-all duration-500 dark:bg-dark md:hidden"
      >
        <button onClick={() => setSideBar(!sideBar)}></button>
        <Link
          href={"/"}
          onClick={() => setSideBar(false)}
          className="group flex h-16 w-16 flex-col items-center justify-center gap-2 rounded-lg text-center transition-all hover:bg-gray-100 dark:hover:bg-gray-400/40"
        >
          <Icons.home className="w-7 stroke-gray-500 stroke-2 dark:group-hover:stroke-white" />
          <span className="text-[10px] leading-3 text-gray-500 dark:group-hover:text-white">خانه</span>
        </Link>
        <Link
          href={"/blog"}
          onClick={() => setSideBar(false)}
          className="group flex h-16 w-16 flex-col items-center justify-center gap-2 rounded-lg text-center transition-all hover:bg-gray-100 dark:hover:bg-gray-400/40"
        >
          <Icons.clapperboard className="w-7 stroke-gray-500 stroke-2 dark:group-hover:stroke-white" />
          <span className="text-[10px] leading-3 text-gray-500 dark:group-hover:text-white">
            مجله ویدیو سبز
          </span>
        </Link>
        <Link
          href={"/news"}
          onClick={() => setSideBar(false)}
          className="group flex h-16 w-16 flex-col items-center justify-center gap-2 rounded-lg text-center transition-all hover:bg-gray-100 dark:hover:bg-gray-400/40"
        >
          <Icons.bell className="w-7 stroke-gray-500 stroke-2 dark:group-hover:stroke-white" />
          <span className="text-[10px] leading-3 text-gray-500 dark:group-hover:text-white">تازه ها</span>
        </Link>
        <Link
          href={"/about"}
          onClick={() => setSideBar(false)}
          className="group flex h-16 w-16 flex-col items-center justify-center gap-2 rounded-lg text-center transition-all hover:bg-gray-100 dark:hover:bg-gray-400/40"
        >
          <Icons.shield_question className="w-7 stroke-gray-500 stroke-2 dark:group-hover:stroke-white" />
          <span className="text-[10px] leading-3 text-gray-500 dark:group-hover:text-white">درباره ما</span>
        </Link>
      </div>
      <div
        ref={shadowPage}
        onClick={() => setSideBar(!sideBar)}
        className="fixed right-0 top-16 z-20 hidden h-full w-full bg-black transition-opacity md:hidden"
      ></div>
    </>
  );
}
