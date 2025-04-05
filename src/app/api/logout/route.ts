import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "با موفقیت خارج شدید" });
  response.cookies.set("token", "", {
    httpOnly: true,
    secure:false, 
    // process.env.NODE_ENV === "production" && process.env.HTTPS === "true", // Only in production
    maxAge: 1, // 1 hour
    path: "/", // Cookie path
    sameSite: "lax", // SameSite attribute
  });

  console.log("response to logOut is : ", response);

  return response;
}
