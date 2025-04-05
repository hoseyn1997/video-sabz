import { prisma } from "@/lib/db/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface RegisterRequestBody {
  username: string;
  password: string;
  phoneNumber: string;
  email?: string;
}

export async function POST(req: Request) {
  const { username, password, phoneNumber }: RegisterRequestBody =
    await req.json();

  const user = await prisma.user.findUnique({ where: { UserName: username } });
  if (user)
    return NextResponse.json(
      { message: "نام کاربری قبلا انتخاب شده است" },
      { status: 409 }
    );
  const user_with_phone = await prisma.user.findUnique({
    where: { PhoneNumber: phoneNumber },
  });
  if (user_with_phone)
    return NextResponse.json(
      { message: " شماره تماس قبلا انتخاب شده است" },
      { status: 409 }
    );

  if (!username || !phoneNumber || !password) {
    return NextResponse.json(
      { message: "فیلد های اجباری را پر کنید" },
      { status: 409 }
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Save user to the database
  await prisma.user.create({
    data: {
      UserName: username,
      PhoneNumber: phoneNumber,
      Password: hashedPassword,
      PhoneNumberConfirmed: false,
    },
  });

  const response = NextResponse.json({
    message: "ثبت نام موفق",
  });
  return response;
}
