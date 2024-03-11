import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getProfile } from "./services";


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const routes = ['/', '/my-links']
  const { pathname } = request.nextUrl;
  if (!routes.includes(pathname)) {
    return NextResponse.redirect('https://api.shortten.link/'+pathname.split('/').pop() || '');
  }
  const cookies = request.headers.get("Cookie");

  // Si hay cookies, buscar el token JWT
  const token = cookies
    ? cookies
        .split(";")
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith("jwt="))
        ?.split("=")[1]
    : undefined;

  if (token) {
    getProfile()
      .then((res) => {
        if (!res || typeof res === "string") {
          return NextResponse.redirect(new URL("/", request.url));
        }
        if (res.data) {
          return NextResponse.next();
        }
      })
      .catch(() => {
        return NextResponse.redirect(new URL("/", request.url));
      });
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/my-links", "/:slug*"],
};
