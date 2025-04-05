import { NextRequest } from "next/server";
import { create_new_teacher } from "./teacher.add";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  return await create_new_teacher(formData);
}

