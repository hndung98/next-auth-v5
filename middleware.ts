import acceptLanguage from "accept-language";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import {
  cookieName,
  fallbackLng,
  headerName,
  languages,
} from "@/app/i18n/settings";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

const checkPublicRoute = (route: string) => {
  return publicRoutes.some((publicPath) =>
    publicPath === "/" ? route === "/" : route.startsWith(publicPath)
  );
};

export default auth((req, res) => {
  const { nextUrl, cookies } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = checkPublicRoute(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl != nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  let lng: string | undefined | null;
  if (cookies.has(cookieName))
    lng = acceptLanguage.get(cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  const lngInPath = languages.find((loc) =>
    req.nextUrl.pathname.startsWith(`/${loc}`)
  );
  const headers = new Headers(req.headers);
  headers.set(headerName, lngInPath || lng);

  // Redirect if lng in path is not supported
  if (!lngInPath && !req.nextUrl.pathname.startsWith("/_next")) {
    // return NextResponse.redirect(
    //   new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    // );
  } else {
    if (req.headers.has("referer")) {
      const refererUrl = new URL(req.headers.get("referer") || "");
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`)
      );
      const response = NextResponse.next({ headers });
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
      return response;
    }
    return NextResponse.next({ headers });
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
