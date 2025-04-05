"use client";
import React, { useEffect, useRef, useState } from "react";
import { Icons } from "../../ui/icons/Icons";
import Image from "next/image";
import Link from "next/link";
import Preview from "./Preview";
import { videoWithCollection } from "@/lib/types/video";
import { differenceInDays, differenceInHours } from "date-fns";
import { useModal } from "@/lib/contexts/modalContext";
import toast from "react-hot-toast";

interface Props {
  video: videoWithCollection;
}

const VideoCard = ({ video }: Props) => {
  const [collectionOptions, setCollectionOptions] = useState(false);
  const [preview, setPreview] = useState(false);
  const [playingPreview, setPlayingPreview] = useState(false);
  const modal = useModal();
  const divRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        divRef.current &&
        !divRef.current.contains(event.target as Node)
      ) {
        setCollectionOptions(false); // Close the div
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative grid gap-1 group rtl w-full rounded-xl transition-all cursor-pointer justify-self-center hover:bg-gray-50/60 dark:hover:bg-gray-50/0 p-2">
      <div
        onMouseOver={() => {
          setPreview(true);
          setPlayingPreview(true);
        }}
        onMouseLeave={() => {
          setPreview(false);
          setPlayingPreview(false);
        }}
        className="relative"
      >
        <div className="absolute top-0 z-10 left-0 right-0 rounded-md dark:bg-gradient-to-b from-black/70 to-[rgba(18,_18,_18,_0)] p-2 h-20 text-white shadow-[0_0_0_transparent]"></div>
        {video.Photo?.Photo.FilePath ? (
          <Image
            src={video.Photo?.Photo.FilePath}
            alt={video.Title}
            width={320}
            height={170}
            style={{ height: "auto" }}
            priority
            className="w-full rounded-xl sm:max-h-40 lg:max-h-44 object-cover aspect-video"
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <Icons.video_camera className="w-full rounded-xl sm:max-h-40 lg:max-h-44 object-cover aspect-video" />
        )}
        <div className="absolute bottom-0 z-10 left-0 right-0 rounded-md dark:bg-gradient-to-t from-black/70 to-[rgba(18,_18,_18,_0)] p-2 h-20 text-white shadow-[0_0_0_transparent]"></div>
        {preview && playingPreview && (
          <Preview
            videoId={video.ShortId}
            videoPhoto={video.Photo?.Photo.FilePath}
            className="absolute top-0 right-0 left-0 mx-auto rounded-xl p-0"
            collectionPhoto={video.Collection.Photo?.Photo.FilePath}
          />
        )}
      </div>
      {playingPreview ? (
        <button
          onClick={() => {
            setPreview(false);
            setPlayingPreview(false);
          }}
          className="absolute top-3 left-3 bg-black/10 rounded-full p-1 z-[19]"
        >
          <Icons.pause className="w-5" />
        </button>
      ) : (
        <button
          onClick={() => {
            setPreview(true);
            setPlayingPreview(true);
          }}
          className="absolute top-3 left-3 bg-black/10 rounded-full p-1 z-[19]"
        >
          <Icons.play className="w-5" />
        </button>
      )}
      {video.Collection.DisCount === video.Collection.Cost && (
        <div className="absolute top-3 right-3 text-black">
          <Icons.star className="w-5 stroke-yellow-300 fill-yellow-200" />
          <span className="text-[8px] rounded-full block lg:hidden group-hover:flex bg-yellow-300 p-0.5">
            رایگان
          </span>
        </div>
      )}
      <div className="grid grid-cols-10 items-center group relative">
        <Link href={`/v/${video.ShortId}`} className="col-span-9 Just2Rows">
          <div className="text-xs my-2">{video.Title}</div>
          <div className="flex items-center gap-1 text-gray-400 pr-2 mb-1">
            <span className="overflow-hidden truncate text-teal-600">
            {video.Collection.Title}
            </span>
            <div className="bg-gray-50/10 rounded-full p-1">
              <Icons.link className="w-2 stroke-gray-500" />
            </div>
          </div>
        </Link>
        <button
          ref={buttonRef}
          onClick={() => setCollectionOptions(!collectionOptions)}
          className="col-span-1"
        >
          <Icons.vertical_dots
            className="block lg:hidden lg:group-hover:block w-5 stroke-black dark:stroke-slate-50 
              justify-self-end stroke-[2px]"
          />
        </button>
        {collectionOptions && (
          <ul
            ref={divRef}
            className="absolute flex flex-col gap-2.5 items-end text-sm p-3 py-4 -bottom-24 rounded-xl h-28 left-4 min-w-max bg-white 
            dark:bg-[#16171a] shadow-[0px_0px_1px_gray] dark:shadow-[0px_0px_1px_#fff] ltr z-30"
          >
            <div
              onClick={() => toast.success("در لیست ذخیره شده")}
              className="flex items-center gap-2"
            >
              <span className="rtl">بعدا ببین</span>
              <Icons.clock className="w-4" />
            </div>
            <div
              onClick={() =>
                modal.openModal(
                  <div>
                    <div className="flex justify-center items-center gap-5 p-5">
                      <p className="absolute top-0 left-0 p-3 py-5 font-bold text-green-700 text-sm">
                        اشتراک گذاری
                      </p>
                      <button className="flex flex-col gap-2 justify-center items-center ">
                        <div className="bg-[#ff7a00] p-2 rounded-full">
                          <Icons.eyta className="w-10" />
                        </div>
                        <span className="text-xs font-bold">ایتا</span>
                      </button>
                      <button className="flex flex-col gap-2 justify-center items-center">
                        <div className="bg-orange-100 p-2 rounded-full">
                          <Icons.git className="w-10" />
                        </div>
                        <span className="text-xs font-bold">گیت هاب</span>
                      </button>
                      <button className="flex flex-col gap-2 justify-center items-center">
                        <div className="bg-[#40B3E0] p-2 rounded-full">
                          <Icons.telegram className="w-10" />
                        </div>
                        <span className="text-xs font-bold">تلگرام</span>
                      </button>
                      <button className="flex flex-col gap-2 justify-center items-center">
                        <div className="bg-gray-100 dark:bg-white p-2 rounded-full">
                          <Icons.whats_app className="w-10" />
                        </div>
                        <span className="text-xs font-bold">واتساپ</span>
                      </button>
                    </div>
                    <div className="flex text-xs font-[200] items-center justify-between p-1 dark:bg-gray-100/10 bg-gray-100/80 w-full ring-1 ring-gray-100/20 hover:ring-gray-100/40 rounded-lg transition-all">
                      <p>https://www.aparat.com/v/scbp408</p>
                      <div className="flex justify-center items-center gap-2 rtl dark:bg-gray-100/50 bg-gray-200/70 p-1.5 rounded">
                        <Icons.copy className="w-3 stroke-1" />
                        <span>کپی</span>
                      </div>
                    </div>
                  </div>
                )
              }
              className="flex items-center gap-2"
            >
              <span className="rtl">اشتراک گذاری</span>
              <Icons.share className="w-4" />
            </div>
            <div
              onClick={() => toast.success("در لیست پخش شما ذخیره شد")}
              className="flex items-center gap-2"
            >
              <span className="rtl">ذخیره در لیست</span>
              <Icons.addtolist className="w-4" />
            </div>
          </ul>
        )}
      </div>
      <div className="flex items-center gap-2 text-[10px]">
        <Image
          src={
            video.Collection.Teacher?.Photo?.Photo.FilePath || "/assets/tc1.webp"
          }
          alt={video.Collection.Teacher?.FullName || ""}
          width={22}
          height={22}
          style={{ height: "auto" }}
          className="rounded-full aspect-square object-cover"
        />
        <span className="text-gray-500 hover:text-gray-200">
          {video.Collection.Teacher?.FullName}
        </span>
        <Icons.check className="w-3 bg-green-700 rounded-full stroke-white stroke-[4] p-0.5" />
      </div>
      <div className="flex gap-2 items-center text-[10px] text-gray-300 mx-0.5 mt-1">
        <span>{1.5 + " هزار بازدید"}</span>
        <span>
          {differenceInDays(new Date(), video.CreatedAt) >= 1
            ? differenceInDays(new Date(), video.CreatedAt) + " روز پیش"
            : differenceInHours(new Date(), video.CreatedAt) + " ساعت پیش"}
        </span>
      </div>
    </div>
  );
};

export default VideoCard;
