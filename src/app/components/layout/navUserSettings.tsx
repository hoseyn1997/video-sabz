"use client";
import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import useUserStore from "@/lib/stores/userStore";
import { useRouter } from "next/navigation";
import { Icons } from "../ui/icons/Icons";

const NavUserSettings = () => {
  const [showProfile, setShowProfile] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { logOut, x_user: user } = useUserStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        divRef.current &&
        !divRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false); // Close the div
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="group relative">
      <button
        ref={buttonRef}
        onClick={() => setShowProfile(!showProfile)}
        className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-gray-100 dark:hover:bg-gray-400/40"
      >
        <Icons.user className="w-4 stroke-current stroke-[2px] dark:stroke-gray-100" />
      </button>
      {showProfile && (
        <div
          ref={divRef}
          className="absolute -bottom-28 left-4 flex h-28 min-w-max flex-col items-end gap-2.5 rounded-xl bg-white p-4 text-sm shadow-[0px_0px_1px_gray] dark:bg-[#16171a] dark:shadow-[0px_0px_1px_#fff]"
        >
          <Link
            href={
              user?.loggedIn
                ? `/profile/${user?.username}?menue=true&tab=dashboard`
                : "/"
            }
            className="flex items-center gap-2"
          >
            {user?.loggedIn ? (
              <>
                پروفایل
                <Icons.dashboard className="w-4 stroke-current" />
              </>
            ) : (
              <>
                خانه
                <Icons.home className="w-4 stroke-current" />
              </>
            )}
          </Link>
          <Link href={"/auth/register"} className="flex items-center gap-2">
            ثبت نام
            <Icons.user className="w-4 stroke-current" />
          </Link>
          {user?.loggedIn ? (
            <button
              className="flex items-center gap-2"
              onClick={() => logOut().then(() => router.push("/"))}
            >
              خروج
              <Icons.logout className="w-4 stroke-current" />
            </button>
          ) : (
            <Link
              href={"/auth/login/phone"}
              className="flex items-center gap-2"
            >
              ورود
              <Icons.login className="w-4 stroke-current" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default NavUserSettings;
