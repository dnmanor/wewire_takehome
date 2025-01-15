import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const cookie = (await cookies()).get("kanijiru");

  if (req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.next();
  }
  
  if (!cookie || cookie.name !== "kanijiru") {
    return NextResponse.redirect("http://localhost:3000/login");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
