"use client";
import { Progress } from "@/app/components/features/progress";
import { Icons } from "@/app/components/ui/icons/Icons";
import CustomFileInput from "@/app/components/ui/input/custom_file_input";
import CustomTextArea from "@/app/components/ui/input/custom_text_area";
import CustomTextInput from "@/app/components/ui/input/custom_text_input";
import React, { useState } from "react";

const AddTeacher = () => {
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
            (event.loaded / event.total) * 100
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

      xhr.open("POST", "/api/dash/add-teacher?predicate=teacher");
      xhr.send(formData);
    } catch (error) {
      setUploadStatus("error");
      setErrorMessage("Upload failed.");
      seterror("مشکلی رخ داد دوباره تلاش کنید");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col gap-2 w-full md:w-1/2 lg:w-1/3 px-1 mx-auto rtl"
      >
        <div className="flex justify-start items-center gap-2">
          <Icons.add_user className="w-4 stroke-green-500" />
          <h1 className="text-xs font-bold py-1 text-green-500">
            افزودن مدرس جدید
          </h1>
        </div>

        <CustomFileInput name="file" icon="add_image" />
        <CustomTextInput type="text" name="fName" placeholder="نام مدرس" />
        <CustomTextInput
          type="text"
          name="lName"
          placeholder="نام خانوادگی مدرس"
        />
        <CustomTextInput
          type="text"
          name="phone"
          minLength={11}
          maxLength={11}
          inputMode="tel"
          placeholder="شماره موبایل مدرس"
          icon="phone"
        />
        <CustomTextInput
          type="text"
          name="email"
          placeholder="ایمیل مدرس"
          icon="email"
        />
        <CustomTextArea name="bio" placeholder="توضیحات" icon="star" />
        {error && (
          <>
            <span className="text-[10px] text-red-500">
              {"=> "}خطای سیستمی:
            </span>
            <p className="text-xs font-bold ring-[0.5px] ring-red-400 text-red-400 p-3 w-full text-center rounded-md">
              {error}
            </p>
          </>
        )}
        {uploadStatus === "success" && (
          <p className="text-xs font-bold ring-[0.5px] ring-teal-400 text-green-400 p-3 w-full text-center rounded-md">
            عملیات با موفقیت انجام شد
          </p>
        )}
        {uploadStatus === "uploading" && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-500 text-center">
              Uploading... {progress}%
            </p>
          </div>
        )}
        <button
          disabled={uploadStatus == "uploading"}
          className="text-xs bg-teal-500 hover:bg-teal-400 transition-all duration-200 text-white p-2 rounded-md disabled:opacity-70"
        >
          {uploadStatus == "uploading" ? "در حال ارسال..." : "ارسال"}
        </button>
      </form>
    </div>
  );
};

export default AddTeacher;
