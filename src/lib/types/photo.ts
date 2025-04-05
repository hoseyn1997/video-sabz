import { z } from "zod";

export type UploadEntity = "user" | "teacher" | "collection" | "video";

export type UploadResult = {
  success: boolean;
  data?: {
    filePath: string;
    fileName: string;
  };
  error?: {
    message: string;
    code: string;
  };
};

export const validateImageFile = z.instanceof(File).refine(
  (file) => {
    const validTypes = ["image/png", "image/jpeg", "image/webp"];
    return validTypes.includes(file.type);
  },
  {
    message: "ورودی فایل از نوع مناسب نمی باشد",
  }
);
