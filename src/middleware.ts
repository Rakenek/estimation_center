import { NextResponse } from "next/server";
import { auth, BASE_PATH } from "@/auth";
import { NextAuthRequest } from "next-auth/lib";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/signin).*)"],
};

export default async function middleware(req: NextAuthRequest) {
  const session = await auth();
  const reqUrl = new URL(req.url);

  console.log("Session in Middleware:", session); // 🔥 Log session info
  if (!session) {
    console.log("Redirecting to sign-in...");
    return NextResponse.redirect(
      new URL(
        `${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(
          reqUrl?.pathname
        )}`,
        req.url
      )
    );
  }

  return NextResponse.next(); // ✅ Allow navigation
}
