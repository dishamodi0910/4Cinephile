import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import {
    publicRoutes,
    ApiAuth,
    authRoutes,
    DEFUALT_TO_REDIRECT_AFTER_LOGIN,
} from "@/routes"

const {auth} = NextAuth(authConfig)

export default auth((req: { auth?: any; nextUrl?: any; }) => {
  const { nextUrl } = req;
  const loginStatus = req.auth;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(ApiAuth);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if(isApiAuthRoute)
  return null;

  if(isAuthRoute)
  {
    if(loginStatus)
    return Response.redirect(new URL(DEFUALT_TO_REDIRECT_AFTER_LOGIN,nextUrl));

    return null;
  }

  //Not logged in and not on public route
  if(!loginStatus && !isPublicRoute)
  {
    return Response.redirect(new URL("/auth/login",nextUrl));
  }

  return null;

})

//Whatever is mentioned in matcher, the middleware function auth will be invoked for each of the below mentioned path
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};