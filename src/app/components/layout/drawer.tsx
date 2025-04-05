"use client";
import useDrawer from "@/lib/contexts/drawerContext";
import React, { useEffect, useRef } from "react";

const Drawer = () => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { isOpen, closeDrawer, DrawerContent } = useDrawer();
  useEffect(() => {
    if (drawerRef && isOpen) {
      setTimeout(() => {
        drawerRef.current?.classList.remove("h-0", "p-0");
        drawerRef.current?.classList.add("h-96", "pt-10", "px-2");
      }, 50);
    }
  }, [isOpen, drawerRef]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex bg-black bg-opacity-50">
      <div
        ref={drawerRef}
        className="fixed bottom-0 h-0 w-full overflow-hidden border-t-[0.5px] border-solid border-t-white bg-gray-100 p-0 transition-all duration-300 dark:bg-dark"
      >
        <button
          onClick={closeDrawer}
          className="absolute right-2 top-2 h-5 w-5"
        >
          &times;
        </button>
        {DrawerContent}
      </div>
    </div>
  );
};

export default Drawer;
