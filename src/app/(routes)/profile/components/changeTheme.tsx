"use client";
import { useTheme } from "next-themes";
import React from "react";
import { Icons } from "../../../components/ui/icons/Icons";

const ChangeTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className="flex items-center gap-2 cursor-pointer"
    >
      {theme == "dark" ? (
        <Icons.sun className="w-6 stroke-gray-500 stroke-2" />
      ) : (
        <Icons.moon className="w-6 stroke-gray-500 stroke-2" />
      )}

      <p className="text-lg hidden md:flex text-gray-500 dark:text-gray-400 font-[500]">
        {theme == "dark" ? "روشن" : "تاریک"}
      </p>
    </button>
  );
};

export default ChangeTheme;
