import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { hasClerkServerEnv } from "@/lib/clerk";

const isProtectedRoute = createRouteMatcher([
  "/app(.*)",
  "/employee-portal/dashboard(.*)",
  "/employee-portal/profile(.*)",
  "/employee-portal/time-off(.*)",
  "/employee-portal/hr(.*)",
]);

const hasClerkEnv = hasClerkServerEnv();

const clerkProxy = clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export default hasClerkEnv
  ? clerkProxy
  : (req: NextRequest) => {
      // Avoid a hard middleware crash when Clerk secrets are not configured.
      if (isProtectedRoute(req)) {
        const redirectUrl = new URL("/employee-portal", req.url);
        redirectUrl.searchParams.set("auth", "unavailable");
        return NextResponse.redirect(redirectUrl);
      }

      return NextResponse.next();
    };

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};