import { NextResponse as res } from "next/server";
import { serverURL } from "./secret";

export const config = {
  matcher: "/admin/:path*",
};

export async function middleware(request) {
  const cookie = request.cookies.get("accessToken");

  if (!cookie) {
    return res.redirect(new URL("/", request.url));
  }

  const token = cookie.value;

  const apiRes = await fetch(`${serverURL}/api/access/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!apiRes.ok) {
    return res.redirect(new URL("/", request.url));
  }

  return res.next(); // make sure to return this
}
