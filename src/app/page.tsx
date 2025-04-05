export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { prisma } from "@/lib/db/db";
import Blogs from "./(routes)/blog/components/blogs";
import Link from "next/link";
import VideosList from "./components/layout/home/videos";

export const metadata: Metadata = {
  title: "Home - ویدیو سبز",
  description: "Welcome to ویدیو سبز - Your education path awaits you.",
  keywords: "education, ویدیو سبز, online learning",
};

export const viewport = {
  themeColor: "#000",
};

const ITEMS_PER_PAGE = 4;
// interface HomeProps {
//   searchParams: {
//     page?: string;
//   };
// }
interface HomeProps {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;

  const currentPage = Math.max(Number(page?.replace(/\D/g, "")) || 1, 1);
  // Fetch all posts up to current page
  let videos = await prisma.video.findMany({
    take: ITEMS_PER_PAGE * currentPage,
    orderBy: { CreatedAt: "desc" },
    include: {
      Collection: {
        include: {
          Photo: {
            include: {
              Photo: true,
            },
          },
          Teacher: {
            include: {
              Photo: {
                include: {
                  Photo: true,
                },
              },
            },
          },
        },
      },
      Photo: {
        include: {
          Photo: true,
        },
      },
    },
  });

  // Calculate total pages
  const totalVideos = await prisma.video.count();
  const totalPages = Math.ceil(totalVideos / ITEMS_PER_PAGE);

  return (
    <div className="rtl mx-auto max-w-screen-container overflow-x-hidden px-3 py-6 transition-all lg:px-0">
      <div className="fixed top-16 z-[19] flex w-full items-center justify-start gap-2 bg-white p-0 dark:bg-dark">
        <Link
          href={"/"}
          className="border-t-2 border-solid p-1.5 text-xs text-black dark:border-white dark:text-white"
        >
          همه
        </Link>
        <Link
          href={"/"}
          className="p-1.5 text-xs text-gray-400 dark:text-gray-300"
        >
          آموزشی
        </Link>
        <Link
          href={"/"}
          className="p-1.5 text-xs text-gray-400 dark:text-gray-300"
        >
          سرگرمی
        </Link>
        <Link
          href={"/"}
          className="p-1.5 text-xs text-gray-400 dark:text-gray-300"
        >
          محبوب ترین ها
        </Link>
      </div>
      <p className="my-3 w-fit text-sm font-bold text-green-500 lg:text-lg">
        ویژه‌های ویدئو سبز
      </p>
      <VideosList
        initialVideos={videos}
        currentPage={currentPage}
        totalPages={totalPages}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
      />
      <p className="relative mt-14 w-fit text-sm font-bold text-green-500 lg:text-lg">
        <span className="opacity-50">آخرین مقالات</span>
        <span className="absolute -left-3 -top-3 animate-pulse rounded-full bg-orange-500/50 p-1 text-[8px] leading-[8px] text-white ring-1 ring-red-400">
          به زودی
        </span>
      </p>
      <Blogs />
    </div>
  );
}
