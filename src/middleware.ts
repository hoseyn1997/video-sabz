import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/utils/verify_token";

type DecodedToken = {
  userId: string;
  username: string;
  iat: number;
  exp: number;
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // console.log('the middleware reuesi s: ', request)

  // if (pathname.startsWith("/profile")) {
  //   console.log("the path name started with profile");
  // }

  //get token
  const cookie_token = request.cookies.get("token");
  const token = cookie_token ? cookie_token.value : null;

  // Verify the token => returns the decoded token or null
  const decodedToken = !!token
    ? ((await verifyToken(token)) as DecodedToken)
    : null;

  // authorize the user to access the profilePage
  if (pathname.startsWith("/profile")) {
    if (!decodedToken) {
      console.log("error: line 32");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (!decodedToken.username) {
      console.log("erro: line 37");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Extract username from URL
    const requestedUsername = request.nextUrl.pathname.split("/")[2];

    if (requestedUsername !== decodedToken.username) {
      console.log("error: line 45");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const request_headers = new Headers(request.headers);
  const user = !!decodedToken
    ? {
        userId: decodedToken.userId,
        username: decodedToken.username,
        loggedIn: true,
      }
    : {
        userId: "",
        username: "",
        loggedIn: false,
      };
  request_headers.set("x-user", JSON.stringify(user));

  return NextResponse.next({
    request: {
      headers: request_headers,
    },
  });
}

export const config = {
  matcher: ["/:path*"],
};
