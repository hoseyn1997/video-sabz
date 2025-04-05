"use client";
import { createContext, useContext, useState } from "react";

interface drawerContextType {
  isOpen: boolean;
  openDrawer: (content: React.ReactNode) => void;
  closeDrawer: () => void;
  DrawerContent: React.ReactNode;
}

const DrawerContext = createContext<drawerContextType | null>(null);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [DrawerContent, setDrawerContent] = useState<React.ReactNode>(null);

  const openDrawer = (content: React.ReactNode) => {
    setDrawerContent(content);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setDrawerContent(null);
  };
  return (
    <DrawerContext.Provider
      value={{ isOpen, openDrawer, closeDrawer, DrawerContent }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export default function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
