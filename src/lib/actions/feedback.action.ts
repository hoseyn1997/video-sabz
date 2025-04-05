"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../db/db";

export async function handlefeedback(
  initialState: { message: string; error: string },
  formData: FormData,
) {
  const rawData = {
    linkdinId: formData.get("linkdin_id") as string,
    feedback: formData.get("feedback") as string,
    score: Number(formData.get("score")) as number,
  };
  if (!!!rawData.feedback || !!!rawData.linkdinId || !!!rawData.score) {
    return {
      message: "",
      error: "همه فیلد های ضرور را پر کنید",
    };
  }

  let FeedBack = await prisma.feedBack.findFirst({
    where: {
      LinkdinId: rawData.linkdinId,
    },
  });

  if (!!FeedBack)
    return {
      message: "",
      error: "ببخشید قبلا یه بار پیام دادی",
    };
  else
    await prisma.feedBack.create({
      data: {
        FeedBack: rawData.feedback,
        LinkdinId: rawData.linkdinId,
        Score: rawData.score,
      },
    });

  revalidatePath("/feedback");
  return {
    message: "عملیات موفقیت آمیز",
    error: "",
  };
}
