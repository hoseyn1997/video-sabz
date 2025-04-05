import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ModalProvider } from "../lib/contexts/modalContext";
import { Toaster } from "react-hot-toast";
import { headers } from "next/headers";
import { UserProvider } from "../lib/contexts/userContext";
import { get_xUser } from "@/lib/utils/get_x_user";
import { DrawerProvider } from "../lib/contexts/drawerContext";
import Navbar from "./components/layout/navbar";
import Modal from "./components/layout/modal";
import Drawer from "./components/layout/drawer";

export const metadata: Metadata = {
  title: "ویدیو سبز",
  description: "مسیر تحصیلی خودت رو با ویدیو سبز تضمین کن",
};

export const viewport = {
  themeColor: "#8ff1ca",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const x_user = await get_xUser(headers);

  return (
    <html
      lang="fa"
      className="example2 overflow-x-hidden"
      suppressHydrationWarning
    >
      <body className="example2 pt-16 antialiased">
        <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
          <ModalProvider>
            <DrawerProvider>
              <UserProvider x_user={x_user}>
                <Navbar />
                <Modal />
                <Drawer />
                {children}
                <Toaster position="bottom-right" />
              </UserProvider>
            </DrawerProvider>
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
