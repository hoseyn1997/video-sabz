"use client";
import React, { useState } from "react";
import CustomTextInput from "@/app/components/ui/input/custom_text_input";
import CustomTextArea from "@/app/components/ui/input/custom_text_area";
import { Icons } from "@/app/components/ui/icons/Icons";
import CustomFileInput from "@/app/components/ui/input/custom_file_input";
import { Progress } from "@/app/components/features/progress";

interface Props {
  teacherId: string;
}

const AddCollection = ({ teacherId }: Props) => {
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [, setErrorMessage] = useState("");
  const [error, seterror] = useState("");

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setProgress(0);
    setUploadStatus("uploading");

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (event) => {
        console.log("it is on progress: ", xhr.response);
        if (event.lengthComputable) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100,
          );
          setProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadStatus("success");
          setTimeout(() => setUploadStatus("idle"), 2000);
        } else {
          seterror(JSON.parse(xhr.response).error);
          setUploadStatus("error");
          setErrorMessage("Upload failed");
        }
      };

      xhr.onerror = () => {
        seterror(xhr.response.error);
        setUploadStatus("error");
        setErrorMessage("Network error");
      };

      xhr.open("POST", "/api/dash/add-collection?predicate=collection");
      xhr.send(formData);
    } catch (error) {
      setUploadStatus("error");
      setErrorMessage("Upload failed.");
      seterror("مشکلی رخ داد دوباره تلاش کنید");
    }
  };
  // rtl my-5 flex flex-col gap-1 p-1.5 pb-3 sm:p-5
  return (
    <div>
      <form
        onSubmit={handleSubmitForm}
        className="rtl mx-auto flex w-full flex-col gap-2 px-1 pt-5"
      >
        <div className="flex items-center justify-start gap-2">
          <Icons.add className="w-4 stroke-green-500" />
          <h1 className="py-1 text-xs font-bold text-green-500">
            افزودن کالکشن جدید
          </h1>
        </div>
        <CustomFileInput name="file" accept="image/*" icon="add_image" />
        <input type="text" hidden name="teacherId" defaultValue={teacherId} />
        <CustomTextInput type="text" name="Title" placeholder="عنوان کالکشن" />
        <CustomTextInput
          type="text"
          name="Cost"
          icon="toman"
          placeholder="قیمت کالکشن"
        />
        <CustomTextInput
          type="text"
          name="DisCount"
          icon="toman"
          placeholder="میزان تخفیف کالکشن"
        />
        <CustomTextArea name="Description" icon="star" placeholder="توضیحات" />
        {error && (
          <>
            <span className="text-[10px] text-red-500">
              {"=> "}خطای سیستمی:
            </span>
            <p className="w-full rounded-md p-3 text-center text-xs font-bold text-red-400 ring-[0.5px] ring-red-400">
              {error}
            </p>
          </>
        )}
        {uploadStatus === "success" && (
          <p className="w-full rounded-md p-3 text-center text-xs font-bold text-green-400 ring-[0.5px] ring-teal-400">
            عملیات با موفقیت انجام شد
          </p>
        )}
        {uploadStatus === "uploading" && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-center text-sm text-gray-500">
              Uploading... {progress}%
            </p>
          </div>
        )}

        <button className="rounded-md bg-teal-500 p-2 text-xs text-white transition-all duration-200 hover:bg-teal-400 disabled:opacity-70">
          {progress > 0 && progress < 100 && uploadStatus == "uploading"
            ? "در حال ارسال..."
            : "ارسال"}
        </button>
      </form>
    </div>
  );
};

export default AddCollection;
